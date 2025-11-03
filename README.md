
# Playwright Automation Framework

A comprehensive Playwright and TypeScript test automation framework implementing Page Object Model (POM) design pattern for reliable and maintainable end-to-end testing.

## Features

- **Modern Stack**: Built with Playwright, TypeScript, and Node.js
- **Scalable Architecture**: Page Object Model (POM) design pattern
- **Comprehensive Testing**: Supports UI, API, Visual Comparison, and E2E testing
- **Visual Testing**: Automated visual regression testing with screenshot comparison
- **API Testing**: Complete API test suite with request/response validation
- **Best Practices**: Includes custom page objects, test data management, and utility helpers

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Test Data Management](#test-data-management)
- [Scripts](#scripts)
- [Configuration](#configuration)

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Setup

1. git clone https://github.com/daxone222/playwrightpoc.git
cd playwrightpoc
2. Install dependencies
npm install
3. Install Playwright browsers
npx playwright install
npm install -D @playwright/test

## Project Structure

playwrightpoc/
├── tests/
│   ├── ui/                 # UI tests 
│   ├── api/                # API tests  
│   └── visual/             # Visual comparison tests
├── pages/                  # Page Object Model classes
├── test-data/              # Test data and generators
├── playwright-report/      # Test reports
└── playwright.config.ts    # Playwright configuration

## Usage

This framework uses the Page Object Model pattern to create maintainable and reusable test code. Each page is represented as a class with methods for interactions and assertions.

## Running Tests

Run all tests
- npx playwright test
Run specific test file
- npx playwright test tests/login/login.spec.ts
Run tests with specific reporter
- npx playwright test --reporter=dot
- npx playwright test --reporter=html
Run in headed mode
- npx playwright test --headed
Run tests in UI mode
- npx playwright test --ui
Run using the scripts mentioned in one of the section mentioned below 

## Test Data Management

The framework uses both static and dynamic test data generation:

Static Test Data: Pre-defined test scenarios and user data

Dynamic Test Data with Faker: Randomized data generation for comprehensive test coverage


## Scripts

Run all tests
- npm test
Run UI login tests
- npm run test:login	
Run UI order tests
- npm run test:order	
Run API tests
- npm run test:api	
Run visual comparison tests
- npm run test:visual	

## Configuration

Key configuration in playwright.config.ts:

- Browsers: Chromium, Firefox, WebKit

- Reporting: HTML, JSON, JUnit reporters

- Timeouts: Customizable test and action timeouts

- Screenshots: Configured for failure capture

- Video: Record on failure option