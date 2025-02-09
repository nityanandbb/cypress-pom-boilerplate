// utils/sessions/sessionManager.js

/**
 * @typedef {Object} SessionConfig
 * @property {string} baseUrl - Base URL for the application
 * @property {string} defaultRegion - Default region code (e.g., 'en-us')
 * @property {Object} routes - Route configurations
 * @property {string} routes.dashboard - Dashboard route pattern
 * @property {Function} onError - Custom error handler
 */

/**
 * Session manager for handling login state and session data
 */
class SessionManager {
  constructor(config = {}) {
    this.config = {
      baseUrl: config.baseUrl || Cypress.config("baseUrl"),
      defaultRegion: config.defaultRegion || "en-us",
      routes: {
        dashboard: config.routes?.dashboard || "/{region}/dashboard",
        ...config.routes,
      },
      onError: config.onError || this.defaultErrorHandler,
    };

    this.sessionData = {
      cookies: null,
      localStorage: null,
      sessionStorage: null,
    };
  }

  /**
   * Default error handler
   * @param {Error} error - Error object
   * @private
   */
  defaultErrorHandler(error) {
    cy.log(`Session Error: ${error.message}`);
    throw error;
  }

  /**
   * Get dashboard URL for specific region
   * @param {string} region - Region code
   * @returns {string} Dashboard URL
   */
  getDashboardUrl(region = this.config.defaultRegion) {
    return this.config.routes.dashboard.replace("{region}", region);
  }

  /**
   * Perform login and navigate to dashboard
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.username - Username
   * @param {string} credentials.password - Password
   * @param {Object} options - Login options
   * @param {string} options.region - Region code
   * @param {boolean} options.navigate - Whether to navigate to dashboard
   * @returns {Promise<void>}
   */
  async login(
    { username, password },
    { region = this.config.defaultRegion, navigate = true } = {}
  ) {
    try {
      // Perform login
      await cy.siteLogin(username, password, region);

      // Save session immediately after login
      await this.saveSession();

      // Navigate to dashboard if requested
      if (navigate) {
        await cy.visit(this.getDashboardUrl(region));
      }
    } catch (error) {
      this.config.onError(error);
    }
  }

  /**
   * Save current session data
   * @returns {Promise<void>}
   */
  async saveSession() {
    try {
      // Save cookies
      await cy.getCookies().then((cookies) => {
        this.sessionData.cookies = cookies;
      });

      // Save storage data
      await cy.window().then((win) => {
        this.sessionData.localStorage = { ...win.localStorage };
        this.sessionData.sessionStorage = { ...win.sessionStorage };
      });

      cy.log("Session data saved successfully");
    } catch (error) {
      this.config.onError(error);
    }
  }

  /**
   * Restore saved session data
   * @returns {Promise<void>}
   */
  async restoreSession() {
    try {
      // Clear existing cookies
      await cy.clearCookies();

      // Restore cookies if they exist
      if (this.sessionData.cookies) {
        this.sessionData.cookies.forEach((cookie) => {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            path: cookie.path,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            expiry: cookie.expires,
          });
        });
      }

      // Restore storage data
      await cy.window().then((win) => {
        // Restore localStorage
        if (this.sessionData.localStorage) {
          Object.entries(this.sessionData.localStorage).forEach(
            ([key, value]) => {
              win.localStorage.setItem(key, value);
            }
          );
        }

        // Restore sessionStorage
        if (this.sessionData.sessionStorage) {
          Object.entries(this.sessionData.sessionStorage).forEach(
            ([key, value]) => {
              win.sessionStorage.setItem(key, value);
            }
          );
        }
      });

      cy.log("Session restored successfully");
    } catch (error) {
      this.config.onError(error);
    }
  }

  /**
   * Clear all session data
   * @returns {Promise<void>}
   */
  async clearSession() {
    try {
      await cy.clearCookies();
      await cy.window().then((win) => {
        win.localStorage.clear();
        win.sessionStorage.clear();
      });
      this.sessionData = {
        cookies: null,
        localStorage: null,
        sessionStorage: null,
      };
      cy.log("Session cleared successfully");
    } catch (error) {
      this.config.onError(error);
    }
  }
}

// utils/sessions/index.js
export const createSessionManager = (config) => new SessionManager(config);

// Example usage configuration file
// utils/sessions/config.js
export const defaultSessionConfig = {
  baseUrl: "https://your-app.com",
  defaultRegion: "en-us",
  routes: {
    dashboard: "/{region}/dashboard",
    profile: "/{region}/profile",
  },
  onError: (error) => {
    cy.log(`Custom error handler: ${error.message}`);
    throw error;
  },
};
