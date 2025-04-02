import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#01490b")};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1.5rem;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 4px;

  &:hover {
    color: #ff9800;
  }

  &:active {
    color: #ff9800;
  }
`;

const StyledMenudiv = styled.div`
  border: ${(props) => (props.isDarkMode ? "1px solid white " : "none")};
`;

const StyledH1 = styled.h1`
  color: ${(props) => (props.isDarkMode ? "#f48435" : "#01490b")};
`;

const Home = ({ isDarkMode }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numServings, setNumServings] = useState("");
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const API_URL = "https://tasty.p.rapidapi.com/recipes/list";
  const API_OPTIONS = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "058f5dc790mshc481d5c9563dfe3p1a91cbjsne3e394091825",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  // My API account may have reached its limit request number per mouth, so i order to test this we need to sign up for new Key, something wrong with api

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    // Check if recipes already exist in localStorage
    const storedRecipes = localStorage.getItem("recipes_page"); //it should get fetched data to display change to  "recipes_page" whem api back to normal or not limited anymore
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
      setOriginalRecipes(JSON.parse(storedRecipes));
    } else {
      fetchRecipes(currentPage);
    }
  }, [currentPage]);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      let url = `${API_URL}?from=${(currentPage - 1) * 12}&size=12`;

      if (query.trim()) {
        url += `&q=${query}`;
      }

      const response = await fetch(url, API_OPTIONS);
      const data = await response.json();

      setRecipes(data.results || []);
      localStorage.setItem("recipes_page", JSON.stringify(data.results || []));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false); // Set loading state to false once data is fetched
    }
  };

  // Ensure fetch happens when searching
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page
    fetchRecipes(1);
  };

  const servingsMap = {
    "Servings: 1": "1",
    "Servings: 4": "4",
    "Servings: 6 | 6-8 Servings": "6",
    "Servings: 8 | 8 Servings | Makes 8-10 cookies": "8",
    "10 Servings | Servings: 6-10": "10",
    "12 Servings": "12",
    "Makes 14-16 tacos": "14",
    "Servings: 20": "20",
    "Servings: 24": "24",
  };

  useEffect(() => {
    let filtered = [...originalRecipes];

    if (query.trim()) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (numServings && numServings !== "*") {
      const normalizedServing = servingsMap[numServings];
      filtered = filtered.filter((recipe) => {
        const recipeServing = servingsMap[recipe.yields] || recipe.yields;
        return recipeServing === normalizedServing;
      });
    }

    setRecipes(filtered.slice((currentPage - 1) * 12, currentPage * 12));
  }, [query, numServings, originalRecipes, currentPage]);

  const toggleFavorite = (recipe) => {
    const isFavorited = favorites.some((fav) => fav.id === recipe.id);
    let updatedFavorites;
    if (isFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      updatedFavorites = [...favorites, recipe];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="relative">
      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col mt-20 mb-10 justify-center items-center mx-auto h-full">
        <StyledH1
          isDarkMode={isDarkMode}
          className="pt-25 px-2 w-full max-w-xl text-4xl font-main text-center"
        >
          Find delicious recipes for every occasion!
        </StyledH1>

        <div className="flex items-center bg-white border-2 border-brand rounded-lg shadow-sm p-2 w-full max-w-md my-5 transition-all duration-300 hover:border-brandLight focus-within:border-brandLight">
          <svg
            className="h-5 w-5 text-brand opacity-50 mx-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow p-2 text-brand outline-none w-full"
            placeholder="Search recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="w-[80%] text-prime bg-brand p-2 h-15 bg-linear-45 from-brandSkew to-brand mt-15 rounded-md flex flex-wrap items-center justify-end gap-4">
          {/* Number of Servings Dropdown */}
          <select
            className="p-2 rounded-md bg-white text-brand"
            value={numServings}
            onChange={(e) => setNumServings(e.target.value)}
          >
            <option value="">Select Min Servings</option>
            <option value="*">ALL</option>
            <option value="Servings: 1">1 serve</option>
            <option value="Servings: 4">4 serves</option>

            <option value="12 Servings">12 serves</option>
            <option value="Makes 14-16 tacos">14 serves</option>
            <option value="Servings: 20">20 serves</option>
            <option value="Servings: 24">24 serves</option>
          </select>
        </div>

        <div className="mt-10 m-2 w-[80%] p-5 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 px-3">
            {isLoading ? (
              <span className="loading loading-dots text-prime"></span> // Show loading spinner
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => {
                const isFavorited = favorites.some(
                  (fav) => fav.id === recipe.id
                );
                return (
                  <StyledMenudiv
                    isDarkMode={isDarkMode}
                    key={recipe.id}
                    className="relative h-102 shadow-lg rounded-lg overflow-hidden"
                  >
                    <button
                      className="absolute top-3 right-3 text-xl"
                      onClick={() => toggleFavorite(recipe)}
                    >
                      <FaHeart
                        data-testid="fav"
                        className={`transition-all duration-300 ${
                          isFavorited ? "text-red-500" : "text-gray-300"
                        }`}
                      />
                    </button>

                    <img
                      src={
                        recipe.thumbnail_url ||
                        "https://via.placeholder.com/300"
                      }
                      alt={recipe.name}
                      className="w-full bg-cover h-40 object-cover"
                    />

                    <div className="">
                      <div className="p-3">
                        <p className="text-md font-semibold">{recipe.name}</p>
                        <p className="text-sm font-semibold">{recipe.yields}</p>
                        <p className="text-[13px] h-10 ">
                          {recipe.description
                            ? recipe.description.slice(0, 70) + "..."
                            : "No description available."}
                        </p>
                      </div>
                      <StyledLink
                        isDarkMode={isDarkMode}
                        to={`/recipe/${recipe.id}`}
                        className="hover:underline mx-auto border-1 ms-2"
                      >
                        View Recipe
                      </StyledLink>
                    </div>
                  </StyledMenudiv>
                );
              })
            ) : query || numServings ? (
              <p className="text-center text-lg text-gray-600 mt-5">
                No Recipes Found
              </p>
            ) : (
              <span className="loading loading-dots text-prime"></span> // Show loading spinner if no recipes
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
