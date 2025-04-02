import { render, screen } from "@testing-library/react"; // Import necessary testing utilities
import Home from "../pages/Home"; // Import the Home component to be tested
import { expect, test } from "vitest"; // Import testing functions from Vitest
import "@testing-library/jest-dom"; // Extend Jest matchers for better assertions
import { ThemeProvider } from "styled-components"; // Import ThemeProvider for theme support
import { BrowserRouter as Router } from "react-router-dom"; // Import Router for routing support
import { fireEvent } from "@testing-library/react"; // Import fireEvent to simulate user interactions
import { it } from "vitest"; // Import 'it' for alternative test case definition

// Define a light theme for the ThemeProvider
const lightTheme = {
  body: "#fff7ed",
  text: "#000",
};

// Utility function to render components with ThemeProvider and Router
const renderWithThemeProvider = (ui, theme = lightTheme) => {
  return render(
    <Router>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Router>
  );
};

// Test case: Ensure the Home component renders without crashing
test("Home should render without crashing", () => {
  renderWithThemeProvider(<Home />);

  // Check if a specific text element is present in the document
  expect(
    screen.getByText("Find delicious recipes for every occasion!")
  ).toBeInTheDocument();
});

// Test case: Ensure the search input updates when a user types
it("updates the search input field", () => {
  renderWithThemeProvider(<Home />);

  // Get the search input field by placeholder text
  const searchInput = screen.getByPlaceholderText(/Search recipes/i);

  // Simulate user typing "chicken" in the input field
  fireEvent.change(searchInput, { target: { value: "chicken" } });

  // Verify that the input field value is updated correctly
  expect(searchInput.value).toBe("chicken");
});
