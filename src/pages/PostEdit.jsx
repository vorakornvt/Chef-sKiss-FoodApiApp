import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostEdit = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("recipes")) || [];
    const postToEdit = storedPosts[index];
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    }
  }, [index]);

  const handleSave = () => {
    const storedPosts = JSON.parse(localStorage.getItem("recipes")) || [];
    storedPosts[index] = { title, content };
    localStorage.setItem("recipes", JSON.stringify(storedPosts));
    navigate("/posts"); // Navigate back to the post list
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Your Recipe</h2>
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
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="inline-block **:inline-block p-2 mx-auto my-0 no-underline border-0 rounded-lg text-prime bg-brand bg-linear-45 from-brandSkew to-brand w-35 **:text-xl **:text-center hover:text-complementary hover:bg-linear-225  hover:bg-brand hover:scale-101 text-white shadow-sm hover:shadow-md text-center text-decoration-none  transition-all duration-200 ease-in-out h-10"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PostEdit;
