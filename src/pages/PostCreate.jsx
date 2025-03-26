import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).max(1000).required(),
  url: Joi.string().uri().optional(), // URL validation
  servings: Joi.number().integer().min(1).optional(), // Servings validation
});

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState(""); // State for the URL input
  const [servings, setServings] = useState(""); // State for the servings input
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePost = () => {
    const { error } = schema.validate({ title, content, url, servings });
    if (error) {
      setError(error.details[0].message);
      return;
    }
    setError(null);

    const newPost = { title, content, url, servings };
    const storedPosts = JSON.parse(localStorage.getItem("recipesPost")) || [];
    localStorage.setItem(
      "recipesPost",
      JSON.stringify([...storedPosts, newPost])
    );

    navigate("/posts");
  };

  return (
    <div className="max-w-4xl z-10 w-[70%] mx-auto    p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 font-main text-center">
        Share Your Recipe
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="z-1">
        {" "}
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full z-1 p-2 mb-4 border rounded-lg"
        />
        <textarea
          placeholder="Recipe Details"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg h-32 resize-none"
        />
        <input
          type="url"
          placeholder="Recipe URL (Optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Number of Servings (Optional)"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
      </div>

      <div className="flex justify-center">
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
