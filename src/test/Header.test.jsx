import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "../components/Header";

// Define the light and dark themes used in your app
const lightTheme = {
  body: "#fff7ed",
  text: "#000",
};

const darkTheme = {
  body: "#000000",
  text: "#fff",
};

// Wrap the component with the ThemeProvider
const renderWithThemeProvider = (ui, theme = lightTheme) => {
  return render(
    <Router>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Router>
  );
};

test("Header should render without crashing", () => {
  renderWithThemeProvider(<Header />);

  expect(screen.getByText("RECIPE")).toBeInTheDocument();
});

test("Header should display correct light theme color", () => {
  // Test for light theme
  renderWithThemeProvider(<Header />, lightTheme);
  const linksLight = screen.getByTestId("LOGO");
  expect(linksLight).toHaveClass("sc-jgmqJh zYlci");
});
