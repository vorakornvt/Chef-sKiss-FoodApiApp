import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

/**
 * Schema for validating the recipe post form fields using Joi validation.
 *
 * @constant {Object} schema - Joi validation schema object to validate the form inputs.
 */
const schema = Joi.object({
  title: Joi.string().min(3).max(100).required(), // Recipe title must be between 3 and 100 characters.
  content: Joi.string().min(10).max(1000).required(), // Recipe content must be between 10 and 1000 characters.
  url: Joi.string().uri().optional(), // Optional URL field that must be a valid URI if provided.
  servings: Joi.number().integer().min(1).optional(), // Optional servings field, must be a positive integer.
});

/**
 * PostCreate component for handling the creation of a new recipe post.
 *
 * This component includes a form to input a recipe title, content, an optional URL, and the number of servings.
 * It performs form validation using Joi, stores the recipe post in local storage,
 * and navigates the user to the posts page upon successful creation.
 *
 * @component
 */
const PostCreate = () => {
  // State variables for form inputs and error handling
  const [title, setTitle] = useState(""); // Stores the title of the recipe.
  const [content, setContent] = useState(""); // Stores the content/details of the recipe.
  const [url, setUrl] = useState(""); // Stores the optional URL of the recipe.
  const [servings, setServings] = useState(""); // Stores the optional servings input.
  const [error, setError] = useState(null); // Stores error messages after validation.

  // Navigation hook to navigate between pages
  const navigate = useNavigate();

  /**
   * Handles the form submission for creating a new recipe post.
   *
   * The function validates the form data against the Joi schema. If there are validation errors,
   * it sets an error message. If the validation is successful, it stores the new post in localStorage
   * and navigates the user to the posts page.
   */
  const handlePost = () => {
    // Validate the form data using the Joi schema
    const { error } = schema.validate({ title, content, url, servings });

    // If there is an error, set the error state and return early
    if (error) {
      setError(error.details[0].message);
      return;
    }

    // Clear any previous error
    setError(null);

    // Create the new post object
    const newPost = { title, content, url, servings };

    // Retrieve existing posts from localStorage or initialize an empty array if no posts exist
    const storedPosts = JSON.parse(localStorage.getItem("recipesPost")) || [];

    // Save the new post into localStorage
    localStorage.setItem(
      "recipesPost",
      JSON.stringify([...storedPosts, newPost])
    );

    // Navigate the user to the posts page
    navigate("/posts");
  };

  return (
    <div className="max-w-4xl z-1 w-[70%] mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 font-main text-center">
        Share Your Recipe
      </h2>

      {/* Display error message if any validation error occurs */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="z-1">
        {/* Title input field */}
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full z-1 p-2 mb-4 border rounded-lg"
        />

        {/* Content textarea */}
        <textarea
          placeholder="Recipe Details"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg h-32 resize-none"
        />

        {/* URL input field */}
        <input
          type="url"
          placeholder="Recipe URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />

        {/* Servings input field */}
        <input
          type="number"
          placeholder="Number of Servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
      </div>

      <div className="flex justify-center">
        {/* Submit button */}
        <button
          onClick={handlePost}
          className="inline-block p-2 mx-auto my-0 no-underline border-0 rounded-lg text-prime bg-brand bg-linear-45 from-brandSkew to-brand w-35 text-xl text-center hover:text-complementary hover:bg-linear-225 hover:bg-brand hover:scale-101 text-white shadow-sm hover:shadow-md text-decoration-none transition-all duration-200 ease-in-out h-10"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
