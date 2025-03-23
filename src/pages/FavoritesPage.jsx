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

const FavoritesPage = ({ isDarkMode }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve the saved favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className="flex flex-col mb-10 justify-center items-center mx-auto h-full">
      <p className="pt-5 px-3 w-full max-w-xl text-lg font-main font-bold text-center">
        Your Favorite Recipes
      </p>

      <div className="mt-10 m-2 w-[80%] p-5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
          {favorites.length > 0 ? (
            favorites.map((recipe) => (
              <StyledMenudiv
                isDarkMode={isDarkMode}
                key={recipe.id}
                className="relative shadow-lg rounded-lg overflow-hidden"
              >
                <button className="absolute top-3 right-3 text-xl">
                  <FaHeart className="text-red-500 " />
                </button>

                <img
                  src={
                    recipe.thumbnail_url || "https://via.placeholder.com/300"
                  }
                  alt={recipe.name}
                  className="w-full bg-cover h-40 object-cover"
                />

                <div className="h-60">
                  <div className="p-4">
                    <p className="text-md font-semibold">{recipe.name}</p>
                    <p className="text-sm h-20 text-com">
                      {recipe.description
                        ? recipe.description.slice(0, 80) + "..."
                        : "No description available."}
                    </p>
                  </div>
                  <StyledLink
                    isDarkMode={isDarkMode}
                    to={`/recipe/${recipe.id}`}
                    className="text-brand mt-2 inline-block hover:underline"
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
