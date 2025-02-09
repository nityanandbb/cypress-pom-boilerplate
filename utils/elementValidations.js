// utils/elementValidations.js

/**
 * Element validation utility functions
 * @module elementValidations
 */

/**
 * Verify element text matches expected value
 * @param {Function} getElement - Function that returns the element locator
 * @param {string} expectedText - Expected text to match
 * @returns {void}
 */
export const verifyElementText = (getElement, expectedText) => {
  cy.log(`VALIDATION: Verifying element text matches "${expectedText}"`);
  getElement().should("have.text", expectedText);
  cy.log("SUCCESS: Text verification passed");
};

/**
 * Verify input placeholder text
 * @param {Function} getElement - Function that returns the element locator
 * @param {string} expectedPlaceholder - Expected placeholder text
 * @returns {void}
 */
export const verifyInputPlaceholder = (getElement, expectedPlaceholder) => {
  cy.log(`VALIDATION: Checking placeholder text "${expectedPlaceholder}"`);
  getElement()
    .invoke("attr", "placeholder")
    .should("equal", expectedPlaceholder);
  cy.log("SUCCESS: Placeholder verification passed");
};

/**
 * Comprehensive element validation including visibility and attributes
 * @param {Function} getElement - Function that returns the element locator
 * @param {Object} validations - Validation criteria
 * @returns {void}
 */
export const validateElement = (getElement, validations = {}) => {
  const {
    text,
    fontWeight,
    shouldBeEmpty = false,
    shouldBeVisible = true,
    shouldBeEnabled = true,
  } = validations;

  cy.log("VALIDATION: Performing comprehensive element validation");
  const element = getElement();

  if (shouldBeVisible) {
    element.should("be.visible");
  }

  if (text) {
    element.should("have.text", text);
  }

  if (fontWeight) {
    element.should("have.css", "font-weight", fontWeight);
  }

  if (shouldBeEnabled) {
    element.should("not.be.disabled");
  }

  if (shouldBeEmpty === false) {
    element.should("not.be.empty");
  }

  cy.log("SUCCESS: Comprehensive validation passed");
};
