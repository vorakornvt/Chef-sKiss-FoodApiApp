import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("recipes")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    localStorage.setItem("recipes", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleEdit = (index) => {
    navigate(`/edit/${index}`);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6  shadow-md rounded-lg">
      <p className="text-lg font-bold mb-4 text-center">Your Recipes</p>
      {posts.length > 0 ? (
        <div className="grid grid-cols-3  sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className=" p-4 border-white border-1 h-100  rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-[40px] space-x-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="btn w-50 btn-success text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="btn w-50 btn-secondary text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recipes yet.</p>
      )}
    </div>
  );
};

export default PostList;
