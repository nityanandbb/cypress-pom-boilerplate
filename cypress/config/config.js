// cypress/config/config.js
const environments = {
  dev: "test.dev.com ",
  stage: "test.stg.com",
  prod: "https://www.qed42.com/",
  local: "test.docsal3000.com"
}

function setBaseUrl() {
  const env = process.env.CYPRESS_ENV || "prod";
  Cypress.config("baseUrl", environments[env] || environments.prod);

  console.log(
    `%c🌍 Environment Selected: %c${env}`,
    "color: #4CAF50; font-weight: bold",
    "color: #2196F3; font-weight: bold"
  );
  console.log(
    `%c🔗 Base URL: %c${environments[env]}`,
    "color: #FF9800; font-weight: bold",
    "color: #9C27B0; font-weight: bold"
  );

  // Error handling
  if (!environments[env]) {
    console.log(
      `%c⚠️ Warning: Invalid environment "${env}". Using prod as fallback.`,
      "color: #f44336; font-weight: bold"
    );
  }
}

export { setBaseUrl };
