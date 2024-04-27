import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../superbaseClient";
import "./CreatePost.css";
function CreatePost() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    image_url: ""
  });

  const navigate = useNavigate();

  // Function to handle form submission
  const createPost = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from("posts").insert([post]);

    if (error) {
      console.error("Error creating post:", error);
    } else {
      navigate("/");
    }
  };

  // Function to update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={createPost}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            placeholder="Enter your post title here..."
          />
        </label>
        <label>
          Content
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            placeholder="Enter your post content here..."
          />
        </label>
        <label>
          Image URL (Optional)
          <input
            type="text"
            name="image_url"
            value={post.image_url}
            onChange={handleChange}
            placeholder="Enter the image URL here..."
          />
        </label>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
