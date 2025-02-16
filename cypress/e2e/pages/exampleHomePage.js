// cypress/pages/HomePage.js
import BasePage from "./BasePage";

class exampleHomePage extends BasePage {
  constructor() {
    super();
    // Main navigation selectors
    this.utilityMenuRight = "#top-links";
    this.myAccountLink =
      "a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']";
    this.myAccountDropdown =
      "a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']";
    this.registerLink =
      "ul.dropdown-menu.dropdown-menu-right>li:nth-child(1)>a";
    this.loginLink = "ul.dropdown-menu.dropdown-menu-right>li:nth-child(2)>a";
  }

  // Navigation methods
  visit() {
    super.visit("/");
    return this;
  }

  openMyAccountDropdown() {
    this.click(this.myAccountLink);
    return this;
  }

  navigateToRegister() {
    this.openMyAccountDropdown();
    this.click(this.registerLink);
    return this;
  }

  navigateToLogin() {
    this.openMyAccountDropdown();
    this.click(this.loginLink);
    return this;
  }

  // Verification methods for utility menu section
  verifyUtilityMenuSectionVisible() {
    this.shouldBeVisible(this.utilityMenuRight);
    return this;
  }

  verifyMyAccountLinkText() {
    this.getElement(this.myAccountLink).should("have.text", "My Account");
    return this;
  }

  verifyMyAccountLinkVisible() {
    this.shouldBeVisible(this.myAccountLink);
    return this;
  }

  // Verification methods for dropdown
  verifyDropdownVisible() {
    this.shouldBeVisible(this.myAccountDropdown);
    return this;
  }

  verifyRegisterLinkInDropdown() {
    this.getElement(this.registerLink)
      .should("be.visible")
      .should("have.text", "Register")
      .should("have.attr", "href", "/register");
    return this;
  }

  verifyLoginLinkInDropdown() {
    this.getElement(this.loginLink)
      .should("be.visible")
      .should("have.text", "Login")
      .should("have.attr", "href", "/login");
    return this;
  }

  // Combined verification methods
  verifyAllDropdownLinks() {
    this.verifyRegisterLinkInDropdown();
    this.verifyLoginLinkInDropdown();
    return this;
  }

  verifyCompleteUtilityMenuStructure() {
    this.verifyUtilityMenuSectionVisible()
      .verifyMyAccountLinkVisible()
      .verifyMyAccountLinkText();
    return this;
  }
}
export default exampleHomePage;
