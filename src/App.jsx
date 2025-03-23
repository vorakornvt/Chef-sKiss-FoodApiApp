import { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FavoritesPage from "./pages/FavoritesPage";
import RecipeDetail from "./pages/RecipeDetail";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease-in-out;
  }
`;

const lightTheme = {
  body: "#fff7ed",
  text: "#000",
};

const darkTheme = {
  body: "#000000",
  text: "#fff",
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      {/* Pass toggleTheme and isDarkMode as props to Header */}
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route
            path="/favorites"
            element={<FavoritesPage isDarkMode={isDarkMode} />}
          />
          <Route path="recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Layout>
      <Footer isDarkMode={isDarkMode}></Footer>
    </ThemeProvider>
  );
}

export default App;
