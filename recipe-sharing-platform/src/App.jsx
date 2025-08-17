// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import AddRecipeForm from "./components/AddRecipeForm.jsx"; // <-- import AddRecipeForm

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipeForm />} /> {/* <-- add this route */}
      </Routes>
    </Router>
  );
}

export default App;

