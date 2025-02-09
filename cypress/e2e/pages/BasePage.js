// cypress/pages/BasePage.js
class BasePage {
    constructor() {
        this.timeout = 10000;
    }

    visit(path) {
        cy.visit(path);
    }

    getElement(selector) {
        return cy.get(selector, { timeout: this.timeout });
    }

    click(selector) {
        this.getElement(selector).click();
    }

    type(selector, text) {
        this.getElement(selector).type(text);
    }

    shouldBeVisible(selector) {
        this.getElement(selector).should('be.visible');
    }

    waitForElement(selector) {
        return this.getElement(selector);
    }
}

export default BasePage;