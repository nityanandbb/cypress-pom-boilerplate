// utils/sessionUtils.js

// Storage for session data
const sessionState = {
  cookies: null,
  localStorage: null,
  sessionStorage: null,
};

/**
 * Sets default region and constructs dashboard URL
 * @param {string} region - Region code (e.g., 'en-us')
 * @returns {string} Constructed dashboard URL
 */
export const getDashboardUrl = (region = "en-us") => `/${region}/dashboard`;

/**
 * Performs login and navigates to dashboard
 * @param {Object} params - Login parameters
 * @param {string} params.username - Username for login
 * @param {string} params.password - Password for login
 * @param {string} [params.region='en-us'] - Region code
 * @param {string} [params.dashboardUrl] - Optional custom dashboard URL
 */
export const loginAndNavigate = ({
  username,
  password,
  region = "en-us",
  dashboardUrl = getDashboardUrl(region),
}) => {
  cy.log(`Logging in user: ${username} for region: ${region}`);
  cy.siteLogin(username, password, region);
  cy.visit(dashboardUrl);
};

/**
 * Saves current session data (cookies, localStorage, sessionStorage)
 * @returns {Cypress.Chainable}
 */
export const saveSessionData = () => {
  cy.log("Saving session data");

  return cy.getCookies().then((cookies) => {
    sessionState.cookies = cookies;

    return cy.window().then((win) => {
      sessionState.localStorage = { ...win.localStorage };
      sessionState.sessionStorage = { ...win.sessionStorage };
      cy.log("Session data saved successfully");
    });
  });
};

/**
 * Restores previously saved session data
 * @returns {Cypress.Chainable}
 */
export const restoreSessionData = () => {
  cy.log("Restoring session data");

  // Handle any uncaught exceptions
  Cypress.on("uncaught:exception", (err) => {
    cy.log(`Handled uncaught exception: ${err.message}`);
    return false;
  });

  return cy.clearCookies().then(() => {
    // Restore cookies if they exist
    if (sessionState.cookies) {
      sessionState.cookies.forEach((cookie) => {
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
    return cy.window().then((win) => {
      // Restore localStorage
      if (sessionState.localStorage) {
        Object.entries(sessionState.localStorage).forEach(([key, value]) => {
          win.localStorage.setItem(key, value);
        });
      }

      // Restore sessionStorage
      if (sessionState.sessionStorage) {
        Object.entries(sessionState.sessionStorage).forEach(([key, value]) => {
          win.sessionStorage.setItem(key, value);
        });
      }

      cy.log("Session data restored successfully");
    });
  });
};

/**
 * Clears all session data
 * @returns {Cypress.Chainable}
 */
export const clearSessionData = () => {
  cy.log("Clearing session data");

  return cy.clearCookies().then(() => {
    return cy.window().then((win) => {
      win.localStorage.clear();
      win.sessionStorage.clear();

      // Reset session state
      sessionState.cookies = null;
      sessionState.localStorage = null;
      sessionState.sessionStorage = null;

      cy.log("Session data cleared successfully");
    });
  });
};
