import { useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FavoritesPage from "./pages/FavoritesPage";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";
import PostList from "./pages/PostList";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";
import PageDecoration from "./pages/PageDecoration";

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
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const nextMode = !prevMode;
      document.body.className = nextMode ? "dark-mode" : "";
      saveTimeDarkModeIsToggled(); // Save the time when the user toggles dark mode
      return nextMode;
    });
  };

  function saveTimeDarkModeIsToggled() {
    const now = new Date();
    const darkModeTimes = JSON.parse(
      localStorage.getItem("darkModeTimes") || "[]"
    );
    darkModeTimes.push(now.getHours());
    localStorage.setItem("darkModeTimes", JSON.stringify(darkModeTimes));
  }

  useEffect(() => {
    const darkModeTimes = JSON.parse(
      localStorage.getItem("darkModeTimes") || "[]"
    );
    let averageTime = 0;

    if (darkModeTimes.length > 0) {
      averageTime =
        darkModeTimes.reduce((a, b) => a + b, 0) / darkModeTimes.length;
    }

    const now = new Date();
    if (now.getHours() >= averageTime) {
      setDarkMode(true);
      document.body.className = "dark-mode";
    }
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Header toggleTheme={toggleDarkMode} isDarkMode={darkMode} />
      <Layout toggleTheme={toggleDarkMode} isDarkMode={darkMode}>
        <PageDecoration />
        <Routes>
          <Route path="/" element={<Home isDarkMode={darkMode} />} />
          <Route
            path="/favorites"
            element={<FavoritesPage isDarkMode={darkMode} />}
          />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/edit/:index" element={<PostEdit />} />
          <Route path="/createpost" element={<PostCreate />} />
        </Routes>
      </Layout>
      <Footer isDarkMode={darkMode}></Footer>
    </ThemeProvider>
  );
}

export default App;
