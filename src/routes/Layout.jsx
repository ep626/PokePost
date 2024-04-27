import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import '../Layout.css';  // Assuming your styles will be in Layout.css

const Layout = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Trim the searchTerm and check if it's not empty
    if (searchTerm.trim()) {
      // Navigate to the search results page with the trimmed searchTerm
      navigate(`/search/${searchTerm.trim()}`);
    } else {
      // If the search term is empty or just whitespace, navigate to the homepage
      navigate('/');
    }
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="title">PokePost</div>
        <ul>
          <li>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </li>
          <li className="create-post" key="create-post-button">
            <Link to="/createPost">Create Post</Link>
          </li>
          <li className="home-link" key="home-button">
            <Link to="/">Home</Link>
          </li>

        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
