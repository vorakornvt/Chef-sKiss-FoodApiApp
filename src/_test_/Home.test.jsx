import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { expect, test } from "vitest";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent } from "@testing-library/react";
import { it } from "vitest";

const lightTheme = {
  body: "#fff7ed",
  text: "#000",
};

const renderWithThemeProvider = (ui, theme = lightTheme) => {
  return render(
    <Router>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Router>
  );
};

test("Home should render without crashing", () => {
  renderWithThemeProvider(<Home />);

  expect(
    screen.getByText("Find delicious recipes for every occasion!")
  ).toBeInTheDocument();
});

it("updates the search input field", () => {
  renderWithThemeProvider(<Home />);

  const searchInput = screen.getByPlaceholderText(/Search recipes/i);
  fireEvent.change(searchInput, { target: { value: "chicken" } });

  expect(searchInput.value).toBe("chicken");
});
