import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Layout from "./routes/Layout.jsx";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost.jsx";
import DetailedCard from "./DetailedCard.jsx";
import EditPost from "./pages/EditPost.jsx";
import SearchResults from "./pages/SearchResults.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
        </Route>
        <Route path="/posts/:id" element={<Layout />}>
          <Route index={true} element={<DetailedCard />} />
        </Route>
        <Route path="/editPost/:id" element={<Layout/>}>
          <Route index={true} element={<EditPost />} />
        </Route>
        <Route path="/search/:searchTerm" element={<Layout/>}>
          <Route index={true} element={<SearchResults />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
              <Link style={{ color: "black" }} to="/">
                Back to Home
              </Link>
            </main>
          }
        />
        <Route path="/createPost" element={<Layout/>}>
          <Route index={true} element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);