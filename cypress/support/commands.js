// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// cypress/support/commands.js
// Custom commands for reusable functionality
Cypress.Commands.add('login', (username, password) => {
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#loginBtn').click();
});

// Custom command to filter tests by tags
Cypress.Commands.add('filterTests', () => {
    const testTags = Cypress.env('TEST_TAGS');
    if (!testTags) return;

    const tags = testTags.split(',').map(tag => tag.trim());
    
    // Skip test if it doesn't match the tags
    before(function() {
        const testTags = this.currentTest?.parent?.tags || [];
        const shouldRun = tags.some(tag => testTags.includes(tag));
        if (!shouldRun) {
            this.skip();
        }
    });
});

// Importing all the util functions.

// cypress/support/commands.js
import * as utils from "./utilsLoader";

Object.keys(utils).forEach((key) => {
  Cypress.Commands.add(key, utils[key]);
});
