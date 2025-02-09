// cypress/api/requests.js
import { API_ENDPOINTS } from './endpoints';

export const apiRequests = {
    login: (credentials) => {
        return cy.request({
            method: 'POST',
            url: API_ENDPOINTS.login,
            body: credentials
        });
    },
    getUsers: () => {
        return cy.request({
            method: 'GET',
            url: API_ENDPOINTS.users
        });
    }
};
