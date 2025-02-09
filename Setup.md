 1. **Clone the Repository**  
```bash
git clone <repository-url>
cd <repository-folder>
```

 2. **Install Dependencies**  
Assuming your project has a `package.json` file, run the following command to install all dependencies:  
```bash
npm install
```
This will install Cypress and any other dependencies specified in your `package.json`.  

### 3. **Verify Cypress Installation**  
To verify that Cypress is correctly installed, check the version:  
```bash
npx cypress --version
```

### 4. **Open Cypress for the First Time**  
If Cypress is not already initialized (e.g., no `cypress` folder), run:  
```bash
npx cypress open
```
This will:
- Create a `cypress/` folder in your project directory.
- Generate default folders like `cypress/integration`, `cypress/fixtures`, etc.

### 5. **Running Cypress Tests**  
To execute tests:
- **In the Cypress GUI**:  
  ```bash
  npx cypress open
  ```
  Select and run tests from the graphical interface.  

- **Headless Mode** (CI/CD or scripts):  
  ```bash
  npx cypress run
  ```

### 6. **Additional Setup**  
If your project uses custom configurations or plugins:
- Check the `cypress.config.js` or `cypress.json` for specific settings.
- Set up environment variables if needed using a `.env` file.

After completing these steps, Cypress should be fully installed and ready to run your tests!


## Set up the env

// package.json
{
 "scripts": {
   "cy:dev": "CYPRESS_ENV=dev cypress open",
   "cy:stage": "CYPRESS_ENV=stage cypress open",
   "cy:prod": "CYPRESS_ENV=prod cypress open",
   "cy:run:dev": "CYPRESS_ENV=dev cypress run",
   "cy:run:stage": "CYPRESS_ENV=stage cypress run", 
   "cy:run:prod": "CYPRESS_ENV=prod cypress run",
   "cy:run:dev:chrome": "CYPRESS_ENV=dev cypress run --browser chrome",
   "cy:run:stage:chrome": "CYPRESS_ENV=stage cypress run --browser chrome",
   "cy:run:prod:chrome": "CYPRESS_ENV=prod cypress run --browser chrome"
 }
}

## # Open Cypress Test Runner
npm run cy:dev    # Dev environment
npm run cy:stage  # Stage environment  
npm run cy:prod   # Prod environment

# Run tests headlessly
npm run cy:run:dev
npm run cy:run:stage
npm run cy:run:prod

# Run in Chrome 
npm run cy:run:dev:chrome
npm run cy:run:stage:chrome
npm run cy:run:prod:chrome
