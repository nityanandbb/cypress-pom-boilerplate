// utils/elementActions.js

/**
 * Element interaction utility functions for Cypress
 * @module elementActions
 */

/**
 * Click on a web element with basic validation
 * @param {Function} getElement - Function that returns the element locator
 * @returns {void}
 */
export const clickElement = (getElement) => {
  cy.log("ACTION: Clicking element");
  getElement().click();
  cy.log("SUCCESS: Element clicked");
};

/**
 * Click on a web element only if it's visible
 * @param {Function} getElement - Function that returns the element locator
 * @returns {void}
 */
export const clickVisibleElement = (getElement) => {
  cy.log("ACTION: Attempting to click visible element");
  getElement().should("be.visible").click();
  cy.log("SUCCESS: Visible element clicked");
};

/**
 * Click a link but stay on the same page by removing target attribute
 * @param {Function} getElement - Function that returns the element locator
 * @returns {void}
 */
export const clickLinkInPage = (getElement) => {
  cy.log("ACTION: Clicking link while staying on same page");
  getElement().should("be.visible").invoke("removeAttr", "target").click();
  cy.log("SUCCESS: Link clicked in current page");
};
