import React, { useEffect, useState } from 'react';
import "./App.css";
import "./Layout.css";
import { supabase } from "./superbaseClient";
import Card from "./Card";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select();
    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
  };

  const sortByMostRecent = () => {
    const sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setPosts(sortedPosts);
  };

  const sortByMostLiked = () => {
    const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
    setPosts(sortedPosts);
  };

  return (
    <div className="main-container">
        <div className="buttons-container">
            <button onClick={sortByMostRecent}>Sort by Most Recent</button>
            <button onClick={sortByMostLiked}>Sort by Most Liked</button>
        </div>
        <div className="cards-container">
            {posts.map(post => (
                <Card
                    key={post.id}
                    id={post.id}
                    created_at={post.created_at}
                    title={post.title}
                    content={post.content}
                    image_url={post.image_url}
                    likes={post.likes}
                />
            ))}
        </div>
    </div>
  );
};

export default ShowPosts;
