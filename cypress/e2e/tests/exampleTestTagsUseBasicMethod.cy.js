// Example test file: cypress/e2e/tests/login.cy.js
import { TestType, Priority } from '../../support/tags';
import LoginPage from '../pages/LoginPage';

describe('T2 Authentication Tests', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    // Example 1: Smoke test with Critical Priority
    it('T1 P) Smoke should login with valid credentials', { 
        tags: [`${TestType.SMOKE}`, `${Priority.P0}`] 
    }, () => {
        cy.get('#username').type('testuser');
        cy.get('#password').type('password123');
        cy.get('#loginBtn').click();
        cy.url().should('include', '/dashboard');

    });

    // Example 2: Sanity test with High Priority
    it('T2  P1 sanity should show validation message for empty fields', { 
        tags: [`${TestType.SANITY}`, `${Priority.P1}`] 
    }, () => {
        cy.get('#loginBtn').click();
        cy.get('.error-message').should('be.visible');
    });

    // Example 3: Regression test with Medium Priority
    it('T2 P2 regression should handle incorrect password', { 
        tags: [`${TestType.REGRESSION}`, `${Priority.P2}`] 
    }, () => {
        cy.get('#username').type('testuser');
        cy.get('#password').type('wrongpass');
        cy.get('#loginBtn').click();
        cy.get('.error-message').should('contain', 'Invalid credentials');
    });
});

// cypress/e2e/tests/dashboard.cy.js
describe('Dashboard Features', () => {
    beforeEach(() => {
        cy.login('testuser', 'password123'); // Custom command for login
    });

    // Example 4: Smoke test with Critical Priority for core feature
    it('should display user profile data', { 
        tags: [`${TestType.SMOKE}`, `${Priority.P0}`] 
    }, () => {
        cy.get('#profile-section').should('be.visible');
        cy.get('#user-name').should('contain', 'Test User');
    });

    // Example 5: Multiple tags including custom ones
    it('should update user preferences', { 
        tags: [`${TestType.SANITY}`, `${Priority.P2}`, 'preferences', 'settings'] 
    }, () => {
        cy.get('#settings-btn').click();
        cy.get('#theme-selector').select('dark');
        cy.get('#save-settings').click();
        cy.get('.success-message').should('be.visible');
    });
});