import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

/**
 * Styled Link component that adjusts its color based on the dark mode setting.
 * It also has hover and active states for interaction.
 *
 * @component
 * @param {boolean} isDarkMode - A prop that determines if dark mode is enabled.
 */
const StyledLink = styled(Link)`
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#01490b")};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1.5rem;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 4px;

  &:hover {
    color: #ff9800; // Hover color
  }

  &:active {
    color: #ff9800; // Active color
  }
`;

/**
 * Styled div for each recipe item, which applies a border style based on dark mode.
 *
 * @component
 * @param {boolean} isDarkMode - A prop that determines if dark mode is enabled.
 */
const StyledMenudiv = styled.div`
  border: ${(props) =>
    props.isDarkMode
      ? "1px solid white "
      : "none"}; // Border style based on dark mode
`;

/**
 * FavoritesPage component displays a list of favorite recipes saved in localStorage.
 * It retrieves the favorites, displays them in a grid format, and allows users to
 * view individual recipe details.
 *
 * @component
 * @param {boolean} isDarkMode - A prop that determines if dark mode is enabled.
 */
const FavoritesPage = ({ isDarkMode }) => {
  const [favorites, setFavorites] = useState([]);

  /**
   * useEffect hook that runs when the component mounts.
   * It retrieves the list of favorite recipes from localStorage and updates the state.
   */
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites"); // Get favorites from localStorage
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites)); // Set the favorites state if they exist
    }
  }, []);

  return (
    <div className="flex flex-col mb-10 justify-center items-center mx-auto  h-screen">
      <p className="pt-5 px-3 w-full max-w-xl text-lg font-main font-bold text-center">
        Your Favorite Recipes
      </p>

      <div className="mt-10 m-2 w-[80%] p-5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
          {/* Display favorite recipes */}
          {favorites.length > 0 ? (
            favorites.map((recipe) => (
              <StyledMenudiv
                isDarkMode={isDarkMode}
                key={recipe.id}
                className="relative h-105 shadow-lg rounded-lg overflow-hidden"
              >
                <button className="absolute top-3 right-3 text-xl">
                  <FaHeart className="text-red-500 " /> {/* Heart icon */}
                </button>

                <img
                  src={recipe.thumbnail_url}
                  alt={recipe.name}
                  className="w-full bg-cover h-40 object-cover"
                />

                <div className="h-60">
                  <div className="p-4">
                    <p className="text-md font-semibold">{recipe.name}</p>
                    <p className="text-sm h-20 text-com">
                      {recipe.description
                        ? recipe.description.slice(0, 80) + "..." // Display part of the description
                        : "No description available."}
                    </p>
                  </div>
                  <StyledLink
                    isDarkMode={isDarkMode}
                    to={`/recipe/${recipe.id}`} // Link to the recipe details page
                    className="text-brand ms-2 mt-2 inline-block hover:underline border-1"
                  >
                    View Recipe
                  </StyledLink>
                </div>
              </StyledMenudiv>
            ))
          ) : (
            <p className="text-complementary mt-4">
              You have no favorites yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
