
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
           // implement node event listeners here
          return config
        },
        baseUrl: 'https://example.cypress.io',
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: false,
        screenshotOnRunFailure: true,
        defaultCommandTimeout: 10000,
        env: {
          //  grepFilterSpecs: true,
          //  grepOmitFiltered: true,
            apiUrl: 'http://localhost:3000/api'
        }
    }
})
