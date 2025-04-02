import { expect, test } from "vitest"; // Import testing utilities from Vitest
import { render, screen } from "@testing-library/react"; // Import rendering and querying utilities
import { ThemeProvider } from "styled-components"; // Import ThemeProvider for theming
import { BrowserRouter as Router } from "react-router-dom"; // Import Router for handling routes

import Header from "../components/Header"; // Import the Header component to be tested

// Define the light theme used in the app
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

// Test case: Ensure the Header component renders without crashing
test("Header should render without crashing", () => {
  renderWithThemeProvider(<Header />);

  // Verify that the expected text "RECIPE" is present in the document
  expect(screen.getByText("RECIPE")).toBeInTheDocument();
});

// Test case: Ensure the Header applies the correct light theme styles
test("Header should display correct light theme color", () => {
  // Render the Header with the light theme
  renderWithThemeProvider(<Header />, lightTheme);

  // Select the logo element using the test ID
  const linksLight = screen.getByTestId("LOGO");

  // Verify that the element has the expected class for styling
  expect(linksLight).toHaveClass("sc-jgmqJh zYlci"); // Ensure this class name is stable
});
