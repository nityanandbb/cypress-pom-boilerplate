// cypress/e2e/login.spec.js
import {
  loginAndNavigate,
  saveSessionData,
  restoreSessionData,
  clearSessionData,
} from "../../utils/sessionUtils";

describe("Login Session Tests", () => {
  beforeEach(() => {
    clearSessionData();
  });

  it("should maintain session across page navigations", () => {
    // Login
    loginAndNavigate({
      username: "testuser",
      password: "testpass",
      region: "en-us",
    });

    // Save session after successful login
    saveSessionData();

    // Navigate away
    cy.visit("/some-other-page");

    // Restore session and verify
    restoreSessionData();
    cy.visit("/en-us/dashboard");
    cy.url().should("include", "/dashboard");
  });
});
