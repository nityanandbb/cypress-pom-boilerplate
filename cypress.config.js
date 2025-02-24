
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    timestamp: `${new Date().toLocaleString()}`, // Add date and time to the report
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      // Get LF value from environment or default to false
      // This is set by the run-cypress.sh script
      const LF = config.env.LF || false;

      // Convert to proper boolean if it's a string
      config.env.LF = typeof LF === "string" ? LF === "true" : !!LF;

      console.log("LF environment variable:", config.env.LF);
      return config;
    },
    env: {
      LF: false, // Default value, will be overridden by command line
    },
    // baseUrl: 'https://example.cypress.io',
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    env: {
      //  grepFilterSpecs: true,
      //  grepOmitFiltered: true,
      apiUrl: "http://localhost:3000/api",
    },
  },
});
