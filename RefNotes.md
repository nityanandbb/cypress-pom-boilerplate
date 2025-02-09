# TestFlight-Cypress


Now you can verify tag functionality by running:

All tests:

bashCopynpm run cy:test

Specific tag combinations:

bashCopy# Smoke tests
npm run cy:smoke

# Latest features
npm run cy:smoke:lf

# Critical tests
npm run cy:critical
The logs will clearly show:

Which tests are running
Which tags are active
When LF (Latest Feature) is being used
Priority levels being executed

Each test only uses cy.log() to demonstrate tag functionality without any actual test implementation. This makes it easier to verify that your tag filtering is working correctly.

npm install --save-dev cypress-grep