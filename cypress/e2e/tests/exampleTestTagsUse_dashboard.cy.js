// Example with multiple tags and nested describes
// cypress/e2e/tests/dashboard.cy.js
import { TestType, Priority } from '../../support/tags';

describe('Dashboard Features', { tags: '@dashboard' }, () => {
    describe('User Profile', { tags: '@profile' }, () => {
        it('should display user info correctly', { 
            tags: [`@${TestType.SMOKE}`, `@${Priority.P0}`, '@ui'] 
        }, () => {
            // Test implementation
        });

        it('should update profile picture', { 
            tags: [`@${TestType.REGRESSION}`, `@${Priority.P2}`, '@upload'] 
        }, () => {
            // Test implementation
        });
        
    });
});
