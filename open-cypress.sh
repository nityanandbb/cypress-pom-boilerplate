# open-cypress.sh
#!/bin/bash
# chmod +x open-cypress.sh
# "open:prod": "./open-cypress.sh" // Package.json
# Simple script to open Cypress with environment and LF settings

# Function to log in bold green
log_green() {
    echo -e "\033[1;32m$1\033[0m"
}

# Function to log in bold red
log_red() {
    echo -e "\033[1;31m$1\033[0m"
}

# Function to log in bold yellow
log_yellow() {
    echo -e "\033[1;33m$1\033[0m"
}

# Function to log in bold blue
log_blue() {
    if [ -z "$1" ]; then
        echo -e "\033[1;34m..\033[0m"
    else
        echo -e "\033[1;34m$1\033[0m"
    fi
}

log_green "🚀 Opening Cypress Interactive Mode"

# Get ENV from command line or prompt user
ENV=$1
if [ -z "$ENV" ]; then
    log_yellow "🌐 Select environment:"
    PS3="Environment: "
    select env_option in "prod" "stage" "dev" "local"; do
        if [ -n "$env_option" ]; then
            ENV=$env_option
            break
        else
            log_red "❌ Invalid selection. Please try again."
        fi
    done
fi

# Get LF value from command line or prompt user
LF=$2
if [ -z "$LF" ]; then
    log_yellow "🔄 Use Latest Features?"
    PS3="LF (true/false): "
    select lf_option in "true" "false"; do
        if [ -n "$lf_option" ]; then
            LF=$lf_option
            break
        else
            log_red "❌ Invalid selection. Please try again."
        fi
    done
fi

# Log the configuration
log_blue "─────────────────────────────────"
log_yellow "📋 Configuration:"
log_blue "🌐 Environment: $ENV"
log_blue "🔄 LF Value: $LF"
log_blue "─────────────────────────────────"

# Create the cypress.env.json file
log_yellow "📝 Creating cypress.env.json file"
echo '{"LF": "'$LF'"}' > cypress.env.json

# Export LF as an environment variable
export LF=$LF

log_green "🔧 Configuration complete!"
log_yellow "⏳ Opening Cypress..."

# Launch Cypress in open mode
npx cypress open --env environment=$ENV,LF=$LF

log_green "✅ Cypress launched successfully!"
