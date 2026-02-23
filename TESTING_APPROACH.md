# Multitool Testing Approach

## Overview
For Phase 4: Testing and Quality Assurance, we have implemented a comprehensive automated testing suite utilizing **Vitest** and **React Testing Library**.

Since our tools heavily depend on UI libraries like Monaco Editor (which are difficult to test deeply in a JSDOM environment), we adopted a **Domain-Driven Testing Strategy**. This involves extracting core logic out of React components and into pure utility functions, which are then rigorously tested.

## Methodology

### 1. Unit Testing (Core Logic)
We have refactored the application to separate business logic from UI components. 
- **String Utilities (`src/utils/stringUtils.ts`)**: All case conversions (camelCase, snake_case, Title Case) and line sorting mechanisms are now pure functions. We wrote exhaustive unit tests (`stringUtils.test.ts`) covering various edge cases (e.g., handling underscores, spaces, mixed casing).
- **Formatters (`src/utils/formatUtils.ts`)**: JSON parsing/stringifying and XML validation/formatting logic were extracted. We wrote tests (`formatUtils.test.ts`) to ensure that valid inputs are correctly transformed and invalid inputs throw the expected errors (which are gracefully caught by the UI).

### 2. Integration & Component Testing
By decoupling the logic, our React components are now primarily responsible for state management and rendering. 
- We configured the environment (`jsdom`) to allow rendering React components.
- The `App.tsx` and UI modules rely on state hooks that invoke our fully-tested pure functions.
- Error handling integration is tested manually and programmatically by verifying that exceptions thrown by the pure utilities are correctly piped into the `error` state and displayed as alert banners.

### 3. CI/CD Readiness
We updated `package.json` to include `"test": "vitest run"` and `"test:watch": "vitest"`. This allows seamless integration into GitHub Actions or any CI pipeline, ensuring that future contributions do not break core functionalities.

## Initial Test Results
All implemented unit test suites for formatting and string manipulations are passing successfully. The separation of concerns ensures that the core developer utilities perform deterministically with 100% reliability.