
// cypress/pages/LoginPage.js
import BasePage from './BasePage';

class LoginPage extends BasePage {
  constructor() {
    super();
    this.usernameInput = "#username";
    this.passwordInput = "#password";
    this.loginButton = "#loginBtn";
    this.errorMessage = ".error-message";
  }

  visit() {
    super.visit("/"); //login');
  }

  login(username, password) {
    this.type(this.usernameInput, username);
    this.type(this.passwordInput, password);
    this.click(this.loginButton);
  }

  getErrorMessage() {
    return this.getElement(this.errorMessage);
  }

  validateLoginError(expectedMessage) {
    this.getErrorMessage().should("contain.text", expectedMessage);
  }
 // or
  validateLoginError1(expectedMessage = "Invalid username or password") {
    this.getErrorMessage().should("contain.text", expectedMessage);
  }
    // ex test
    /*
       it("should maintain session across page navigations", () => {

      loginPage.login("wronguser", "correctpassword");
      loginPage.validateLoginError(); // Uses default message
    });

    */
    
}

export default LoginPage;
