🎭 Playwright Automation Framework
A comprehensive Playwright and TypeScript test automation framework implementing Page Object Model (POM) design pattern for reliable and maintainable end-to-end testing.

✨ Features
🚀 Modern Stack: Built with Playwright, TypeScript, and Node.js

🏗️ Scalable Architecture: Page Object Model (POM) design pattern

📊 Comprehensive Testing: Supports UI, API, Visual Comparison, and E2E testing

🖼️ Visual Testing: Automated visual regression testing with screenshot comparison

🔌 API Testing: Complete API test suite with request/response validation

🎯 Best Practices: Includes custom page objects, test data management, and utility helpers



📋 Table of Contents
Installation

Project Structure

Usage

Running Tests

Test Data Management

Scripts

Confirguration



🛠 Installation
Prerequisites
Node.js (version 16 or higher)

npm or yarn

Setup
Clone the repository

bash
git clone https://github.com/daxone222/playwrightpoc.git
cd playwrightpoc
Install dependencies

bash
npm install
Install Playwright browsers

bash
npx playwright install

📁 Project Structure
text
playwrightpoc/
├── tests/
│   ├── ui/                 # UI tests 
│   ├── api/                # API tests  
│   └── visual/             # Visual comparison tests
├── pages/                  # Page Object Model classes
├── test-data/              # Test data and generators
├── playwright-report/      # Test reports
└── playwright.config.ts    # Playwright configuration

🚀 Usage
Writing Tests
This framework uses the Page Object Model pattern to create maintainable and reusable test code:

🧪 Running Tests
Run all tests
bash
npx playwright test
Run specific test file
bash
npx playwright test tests/login/login.spec.ts
Run tests with specific reporter
bash
npx playwright test --reporter=dot
npx playwright test --reporter=html
Run in headed mode
bash
npx playwright test --headed
Run tests in UI mode
bash
npx playwright test --ui

📊 Test Data Management
The framework uses both static and dynamic test data generation:
Static Test Data
Dynamic Test Data with Faker

📝 Scripts
npm test - Run all tests

npm run test:login - Run UI login tests

npm run test:order - Run UI order tests

npm run test:api - Run API tests

npm run test:visual - Run visual comparison tests

🔧 Configuration
Key configuration in playwright.config.ts:

Browsers: Chromium, Firefox, WebKit

Reporting: HTML, JSON, JUnit reporters

Timeouts: Customizable test and action timeouts

Screenshots: Configured for failure capture

Video: Record on failure option