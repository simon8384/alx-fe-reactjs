// src/components/AddRecipeForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data.json";

const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !ingredients || !instructions) {
      setError("Please fill out all fields.");
      return;
    }

    if (ingredients.split(",").length < 2) {
      setError("Please add at least two ingredients, separated by commas.");
      return;
    }

    if (instructions.split(".").length < 2) {
      setError("Please add at least two instructions separated by periods.");
      return;
    }

    // Add new recipe to data.json (for demo purposes we log it)
    const newRecipe = {
      id: data.length + 1,
      title,
      summary: `${title} - A new recipe added.`,
      image: `https://picsum.photos/seed/${title}/300/200`,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions: instructions.split(".").map((i) => i.trim()).filter(Boolean),
    };

    console.log("New Recipe Submitted:", newRecipe);

    // Reset form
    setTitle("");
    setIngredients("");
    setInstructions("");
    setError("");

    // Navigate back to home page (or show success message)
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Recipe</h2>

        {error && (
          <p className="text-red-500 font-medium mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Recipe Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="E.g. Spaghetti Carbonara"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Ingredients
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Separate ingredients with commas: egg, milk, sugar"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Separate steps with periods: Boil pasta. Fry pancetta."
              rows={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
