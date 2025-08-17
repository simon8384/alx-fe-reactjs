// src/components/RecipeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = data.find((r) => r.id === parseInt(id));
    setRecipe(found);
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl">Recipe not found.</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/"
        className="text-blue-500 underline mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-h-96 object-cover rounded mb-6"
      />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <p className="text-gray-700 mb-4">{recipe.summary}</p>

        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients
            ? recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)
            : <li>Sample ingredient 1</li>}
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside text-gray-700">
          {recipe.steps
            ? recipe.steps.map((step, index) => <li key={index}>{step}</li>)
            : <li>Sample step 1</li>}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;
