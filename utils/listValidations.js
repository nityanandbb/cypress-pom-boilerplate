// utils/listValidations.js

/**
 * List validation utility functions
 * @module listValidations
 */

/**
 * Verify list items match expected titles
 * @param {Function} getElements - Function that returns list elements
 * @param {Array<string>} expectedTitles - Array of expected titles
 * @returns {void}
 */
export const verifyListItems = (getElements, expectedTitles) => {
  cy.log("VALIDATION: Verifying list item titles");
  getElements().each(($element, index) => {
    cy.wrap($element)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(expectedTitles[index]);
        cy.log(
          `SUCCESS: Verified item ${index + 1}: "${expectedTitles[index]}"`
        );
      });
  });
};

/**
 * Verify list items with their corresponding URLs
 * @param {Function} getElements - Function that returns list elements
 * @param {Array<Object>} expectedData - Array of objects with title and href properties
 * @returns {void}
 */
export const verifyListItemsWithUrls = (getElements, expectedData) => {
  cy.log("VALIDATION: Verifying list items with URLs");
  getElements().each(($element, index) => {
    const expected = expectedData[index];
    cy.wrap($element)
      .should("include.text", expected.title)
      .and("have.attr", "href", expected.href);
    cy.log(`SUCCESS: Verified item ${index + 1} with URL: "${expected.href}"`);
  });
};

// Example of a page action function (like login)
/**
 * Perform login action with error handling
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.username - Username
 * @param {string} credentials.password - Password
 * @param {Object} selectors - Page element selectors
 * @returns {void}
 */
export const performLogin = ({ username, password }, selectors) => {
  cy.log("ACTION: Initiating login process");

  try {
    // Click login button
    clickVisibleElement(() => selectors.getLoginBtn());
    cy.wait(2000); // Consider using route waiting instead

    // Verify login modal
    verifyElementText(() => selectors.getSignUpText(), "Sign in");

    // Enter credentials
    selectors.getUsernameInput().type(username);
    selectors.getPasswordInput().type(password);

    // Submit login
    clickVisibleElement(() => selectors.getSubmitBtn());

    cy.log("SUCCESS: Login completed");
  } catch (error) {
    cy.log("ERROR: Login failed - " + error.message);
    throw error;
  }
};
