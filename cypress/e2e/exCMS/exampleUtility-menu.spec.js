// cypress/e2e/navigation/utility-menu.spec.js
import HomePage from "../pages/exampleHomePage";

describe("Utility Menu Structure and Navigation", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  describe("Utility Menu Structure", () => {
    it("should display utility menu section", () => {
      homePage.verifyUtilityMenuSectionVisible();
    });

    it("should display My Account link with correct text", () => {
      homePage.verifyMyAccountLinkVisible().verifyMyAccountLinkText();
    });

    it("should verify complete utility menu structure", () => {
      homePage.verifyCompleteUtilityMenuStructure();
    });
  });

  describe("My Account Dropdown", () => {
    beforeEach(() => {
      homePage.openMyAccountDropdown();
    });

    it("should show dropdown menu when clicking My Account", () => {
      homePage.verifyDropdownVisible();
    });

    it("should display Register link with correct text and href", () => {
      homePage.verifyRegisterLinkInDropdown();
    });

    it("should display Login link with correct text and href", () => {
      homePage.verifyLoginLinkInDropdown();
    });

    it("should verify all dropdown links are correct", () => {
      homePage.verifyAllDropdownLinks();
    });
  });

  describe("Navigation Flows", () => {
    it("should navigate to register page", () => {
      homePage.verifyCompleteUtilityMenuStructure().navigateToRegister();

      // Verify URL change
      cy.url().should("include", "/register");
    });

    it("should navigate to login page", () => {
      homePage.verifyCompleteUtilityMenuStructure().navigateToLogin();

      // Verify URL change
      cy.url().should("include", "/login");
    });
  });

  describe("Dropdown Behavior", () => {
    it("should close dropdown when clicking outside", () => {
      homePage.openMyAccountDropdown().verifyDropdownVisible();

      // Click outside the dropdown
      cy.get("body").click(0, 0);

      // Verify dropdown is hidden
      homePage.getElement(homePage.myAccountDropdown).should("not.be.visible");
    });

    it("should maintain dropdown state during page load", () => {
      homePage
        .openMyAccountDropdown()
        .verifyDropdownVisible()
        .verifyAllDropdownLinks();

      // Reload page
      cy.reload();

      // Verify utility menu is still functional
      homePage
        .verifyCompleteUtilityMenuStructure()
        .openMyAccountDropdown()
        .verifyAllDropdownLinks();
    });
  });
});
