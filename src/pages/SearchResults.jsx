import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access URL parameters
import { supabase } from "../superbaseClient";
import Card from "../Card";
import "../App.css";
import "../Layout.css";

const SearchResults = () => {
  const { searchTerm } = useParams(); // Get the search term from the URL
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    let query = supabase.from('posts').select();

    // Apply the search filter only if the searchTerm is not empty and not just whitespace
    if (searchTerm && searchTerm.trim()) {
      query = query.ilike('title', `%${searchTerm.trim()}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching search results:", error);
    } else {
      setPosts(data);
    }
  };

  // Display a different header based on whether a search term was used
  const headerText = searchTerm && searchTerm.trim() 
    ? `Search Results for "${searchTerm}"`
    : "All Posts";

  return (
    <div className="main-container">
      <h2>{headerText}</h2>
      <div className="cards-container">
        {posts.length > 0 ? posts.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            created_at={post.created_at}
            title={post.title}
            content={post.content}
            image_url={post.image_url}
            likes={post.likes}
          />
        )) : <div>No results found.</div>}
      </div>
    </div>
  );
};

export default SearchResults;
