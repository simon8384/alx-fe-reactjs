// src/components/RecipeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((r) => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading recipe...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-20">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-500 font-medium hover:text-blue-700 transition"
      >
        &larr; Back to Home
      </Link>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-4xl mx-auto">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-80 object-cover rounded-t-2xl"
          />
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-lg">
            {recipe.title}
          </div>
        </div>

        <div className="p-8">
          <p className="text-gray-700 mb-6 text-lg">{recipe.summary}</p>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 border-b-2 border-gray-200 pb-2">
              Ingredients
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3 border-b-2 border-gray-200 pb-2">
              Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li
                  key={index}
                  className="bg-blue-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
