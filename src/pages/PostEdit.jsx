import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostEdit = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState(""); // for the image URL
  const [servings, setServings] = useState(""); // for the number of servings

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("recipesPost")) || [];
    const postToEdit = storedPosts[index];
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setUrl(postToEdit.url || ""); // Set URL if available
      setServings(postToEdit.servings || ""); // Set servings if available
    }
  }, [index]);

  const handleSave = () => {
    const storedPosts = JSON.parse(localStorage.getItem("recipesPost")) || [];
    storedPosts[index] = { title, content, url, servings }; // Include URL and servings in the updated post
    localStorage.setItem("recipesPost", JSON.stringify(storedPosts)); // Update localStorage key to match the list of posts
    navigate("/posts"); // Navigate back to the post list
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Your Recipe</h2>

      {/* Recipe Title */}
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      {/* Recipe Content */}
      <textarea
        placeholder="Recipe Details"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      {/* Recipe Image URL */}
      <input
        type="text"
        placeholder="Image URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      {/* Number of Servings */}
      <input
        type="number"
        placeholder="Number of Servings"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      {/* Save Changes Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="inline-block p-2 mx-auto my-0 no-underline border-0 rounded-lg text-prime bg-brand bg-linear-45 from-brandSkew to-brand w-35 text-xl text-center hover:text-complementary hover:bg-linear-225 hover:bg-brand hover:scale-101 text-white shadow-sm hover:shadow-md transition-all duration-200 ease-in-out h-10"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PostEdit;
