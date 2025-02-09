
// cypress/pages/LoginPage.js
import BasePage from './BasePage';

class LoginPage extends BasePage {
    constructor() {
        super();
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.loginButton = '#loginBtn';
        this.errorMessage = '.error-message';
    }

    visit() {
        super.visit('/')//login');
    }

    login(username, password) {
        this.type(this.usernameInput, username);
        this.type(this.passwordInput, password);
        this.click(this.loginButton);
    }

    getErrorMessage() {
        return this.getElement(this.errorMessage);
    }
}

export default LoginPage;
