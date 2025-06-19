// cypress/e2e/tests/example_homePageVisit.cy.js

import HomePage from "../pages/exampleHomePage";

describe("Utility Menu Structure and Navigation", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("should display utility menu section", () => {
    homePage.verifyUtilityMenuSectionVisible();
  });
});
