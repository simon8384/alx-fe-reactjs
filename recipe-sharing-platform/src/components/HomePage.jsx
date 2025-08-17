// src/components/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;

  useEffect(() => {
    setRecipes(data);
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <div className="container mx-auto p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          Recipe Sharing Platform
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search recipes..."
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full sm:w-1/2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Add New Recipe Button */}
        <Link
          to="/add"
          className="mb-6 inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition transform hover:scale-105"
        >
          Add New Recipe
        </Link>
      </div>

      {/* Recipes Grid */}
      <div className="container mx-auto p-4 flex-1">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:shadow-2xl hover:scale-105 transition duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 mb-4">{recipe.summary}</p>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center mt-auto shadow-inner">
        &copy; {new Date().getFullYear()} Recipe Sharing Platform. All rights
        reserved.
      </footer>
    </div>
  );
};

export default HomePage;
