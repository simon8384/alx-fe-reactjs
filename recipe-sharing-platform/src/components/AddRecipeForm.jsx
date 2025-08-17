// src/components/AddRecipeForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data.json";

const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({}); // <-- errors state

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    if (ingredients.split(",").length < 2)
      newErrors.ingredients = "Add at least two ingredients separated by commas";
    if (!instructions.trim()) newErrors.instructions = "Instructions are required";
    if (instructions.split(".").filter(Boolean).length < 2)
      newErrors.instructions = "Add at least two instructions separated by periods";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(); // <-- call validate
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // <-- update errors
      return;
    }

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
    setErrors({});

    // Navigate back to Home Page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Recipe</h2>

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
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
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
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
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
            {errors.instructions && (
              <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
            )}
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
