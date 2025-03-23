import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).max(1000).required(),
});

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePost = () => {
    const { error } = schema.validate({ title, content });
    if (error) {
      setError(error.details[0].message);
      return;
    }
    setError(null);

    const newPost = { title, content };
    const storedPosts = JSON.parse(localStorage.getItem("recipes")) || [];
    localStorage.setItem("recipes", JSON.stringify([...storedPosts, newPost]));

    navigate("/posts");
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 font-main text-center">
        Share Your Recipe
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <textarea
        placeholder="Recipe Details"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg h-32 resize-none"
      />
      <div className="flex justify-center">
        <button
          onClick={handlePost}
          className="inline-block **:inline-block p-2 mx-auto my-0 no-underline border-0 rounded-lg text-prime bg-brand bg-linear-45 from-brandSkew to-brand w-35 **:text-xl **:text-center hover:text-complementary hover:bg-linear-225  hover:bg-brand hover:scale-101 text-white shadow-sm hover:shadow-md text-center text-decoration-none  transition-all duration-200 ease-in-out h-10"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
