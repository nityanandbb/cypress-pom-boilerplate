#!/bin/bash
chmod +x ./run-cypress.sh
# Enhanced script to run Cypress tests with more flexibility

# Function to print logs in color
print_log() {
  COLOR=$1
  MESSAGE=$2
  case $COLOR in
    "green")
      echo -e "\033[0;32m$MESSAGE\033[0m"
      ;;
    "yellow")
      echo -e "\033[0;33m$MESSAGE\033[0m"
      ;;
    "red")
      echo -e "\033[0;31m$MESSAGE\033[0m"
      ;;
    *)
      echo "$MESSAGE"
      ;;
  esac
}

# Welcome message
print_log "green" "🚀 Starting Cypress Test Runner 🚀"

# Get command line arguments
ENV=$1
TEST_TAGS=$2

# If environment is not provided, prompt for it
if [ -z "$ENV" ]; then
  print_log "yellow" "🌐 No environment specified."
  PS3="Select environment: "
  select env_option in "prod" "stage" "dev" "local"; do
    if [ -n "$env_option" ]; then
      ENV=$env_option
      break
    else
      print_log "red" "❌ Invalid selection. Please try again."
    fi
  done
fi

# Get available test folders dynamically
AVAILABLE_FOLDERS=$(find cypress/e2e -maxdepth 1 -type d -not -path "cypress/e2e" | sed 's|cypress/e2e/||g' | sort)

# Prompt for test category
print_log "green" "📂 Available test categories:"
print_log "yellow" "- e2e (all tests) 🔍"

# Display available folders
for folder in $AVAILABLE_FOLDERS; do
  print_log "yellow" "- $folder (${folder} tests) 📁"
done

read -p "Enter test category (default: e2e): " TEST_CATEGORY

# Set the default to e2e if nothing is provided
if [ -z "$TEST_CATEGORY" ]; then
  TEST_CATEGORY="e2e"
fi

# Determine the spec path based on the test category
if [ "$TEST_CATEGORY" = "e2e" ]; then
  SPEC_PATH="cypress/e2e/**/**/*.cy.js"
else
  # Check if it's a specific folder that exists
  if [ -d "cypress/e2e/$TEST_CATEGORY" ]; then
    SPEC_PATH="cypress/e2e/$TEST_CATEGORY/**/*.cy.js"
  else
    print_log "red" "❌ Invalid test category: $TEST_CATEGORY. Using 'e2e' instead."
    SPEC_PATH="cypress/e2e/**/*.cy.js"
  fi
fi

# Ask for LF value (optional)
print_log "yellow" "🔄 Latest Features"
read -p "Enter LF value (true/false, default: false): " LF
if [ -z "$LF" ]; then
  LF="false"
fi

# If TEST_TAGS is not provided, show options and prompt for it
if [ -z "$TEST_TAGS" ]; then
  print_log "green" "🏷️  Available test tag options:"
  print_log "yellow" "- Enter without tags to run all tests ⭐"
  print_log "yellow" "- smoke 🔥 - Quick validation tests"
  print_log "yellow" "- sanity ✅ - Basic functionality tests"
  print_log "yellow" "- regression 🧪 - Complete functional tests"
  print_log "yellow" "- p0 🚨 - Critical priority tests"
  print_log "yellow" "- p1 ❗ - High priority tests"
  print_log "yellow" "- p2 ❕ - Medium priority tests"
  print_log "yellow" "- Predefined groups:"
  print_log "yellow" "  * critical ⚠️ - smoke,p0 (Critical smoke tests)"
  print_log "yellow" "  * high 🔔 - sanity,p1 (High priority sanity tests)"

  read -p "Enter test tags (default: none): " TEST_TAGS
fi

# Set TEST_TAGS environment variable based on predefined groups
case "$TEST_TAGS" in
  "critical")
    print_log "yellow" "⚠️ Using critical preset: smoke,p0"
    TEST_TAGS="smoke,p0"
    ;;
  "high")
    print_log "yellow" "🔔 Using high preset: sanity,p1"
    TEST_TAGS="sanity,p1"
    ;;
esac

# Build the command
CYPRESS_CMD="cypress run --env environment=$ENV,LF=$LF"

# Add TEST_TAGS if provided
if [ ! -z "$TEST_TAGS" ]; then
  CYPRESS_CMD="$CYPRESS_CMD,TEST_TAGS=$TEST_TAGS"
fi

CYPRESS_CMD="$CYPRESS_CMD --spec \"$SPEC_PATH\""

print_log "green" "📋 Running Cypress with the following parameters:"
print_log "green" "🌐 Environment: $ENV"
print_log "green" "📁 Test Category: $TEST_CATEGORY"
print_log "green" "🔄 LF Value: $LF"
if [ ! -z "$TEST_TAGS" ]; then
  print_log "green" "🏷️  Test Tags: $TEST_TAGS"
else
  print_log "green" "🏷️  Test Tags: none (running all tests)"
fi
print_log "green" "🔍 Spec Path: $SPEC_PATH"
print_log "green" "📜 Command: $CYPRESS_CMD"

# Show execution message
print_log "yellow" "⏳ Executing tests... Please wait."

# Execute the Cypress command
eval $CYPRESS_CMD

# Check the exit code
if [ $? -eq 0 ]; then
  print_log "green" "✅ Cypress tests completed successfully! 🎉"
else
  print_log "red" "❌ Cypress tests failed! 😱"
fi

print_log "green" "🏁 Test execution finished."
