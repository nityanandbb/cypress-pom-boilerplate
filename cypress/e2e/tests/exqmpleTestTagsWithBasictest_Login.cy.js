// Example test file: cypress/e2e/tests/login.cy.js
import { TestType, Priority } from '../../support/tags';
import LoginPage from '../pages/LoginPage';
describe('Login Tests', function() {
    beforeEach(() => {
        cy.filterTests();
    });

    // Adding tags to the test suite
    this.tags = [TestType.SMOKE, Priority.P0];

    it('1 should login with valid credentials', function() {
        // Test implementation
        cy.visit('/login');
        cy.get('#username').type('testuser');
        cy.get('#password').type('password');
        cy.get('#loginBtn').click();
    });

    it(' 2 should login with valid credentials', function() {
        // Test implementation
        cy.visit('/login');
        cy.get('#username').type('testuser');
        cy.get('#password').type('password');
        cy.get('#loginBtn').click();
    });

    it('should login with valid credentials', function() {
        // Test implementation
        cy.visit('/login');
        cy.get('#username').type('testuser');
        cy.get('#password').type('password');
        cy.get('#loginBtn').click();
    });
});
