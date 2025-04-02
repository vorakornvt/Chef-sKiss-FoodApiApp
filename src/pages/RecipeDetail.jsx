import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL parameters
  const [recipe, setRecipe] = useState(null); // State to store recipe details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Function to fetch recipe details by ID
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "058f5dc790mshc481d5c9563dfe3p1a91cbjsne3e394091825",
              "X-RapidAPI-Host": "tasty.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        setRecipe(data); // Set the fetched recipe data to the state
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false); // Set loading to false if there’s an error
      }
    };

    fetchRecipeDetails(); // Call the fetch function when the component mounts
  }, [id]); // Run this effect when the `id` changes (when user navigates to a new recipe)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl m-10 flex justify-center items-center mx-auto">
      {/* Recipe Card */}
      <div className="card w-[50%] shadow-xl">
        <figure>
          <img
            src={recipe.thumbnail_url}
            alt={recipe.name}
            className="w-full h-60 object-cover"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title text-center">{recipe.name}</h2>
          <p className="text-sm">
            {recipe.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
