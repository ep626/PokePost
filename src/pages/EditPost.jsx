import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../superbaseClient';
import "../App.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "", image_url: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    setIsLoading(false);
    if (error) {
      console.error('Error fetching post', error);
      setError('Failed to fetch post.');
    } else {
      setPost(data);
    }
  };

  const updatePost = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const { error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id);

    setIsLoading(false);
    if (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post.');
    } else {
      navigate("/");
    }
  };

  const deletePost = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this post?");
    if (confirmation) {
      setIsLoading(true);
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      setIsLoading(false);
      if (error) {
        console.error('Error deleting post:', error);
        setError('Failed to delete post.');
      } else {
        navigate("/");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="post-container">
      <h2>Edit Post</h2>
      <form onSubmit={updatePost}>
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
        <button type="submit" disabled={isLoading}>Update Post</button>
        <button type="button" onClick={deletePost} disabled={isLoading} style={{ marginLeft: "10px" }}>Delete Post</button>
      </form>
    </div>
  );
};

export default EditPost;
