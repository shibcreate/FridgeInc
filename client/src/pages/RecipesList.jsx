import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const APP_ID = '67d82505';
const APP_KEY = '6cc2264f11d4364c5dfdab7aab84538f';

const DEFAULT_QUERY = 'pork'; // Default search query

function RecipesList() {
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    vegetarian: false,
    glutenFree: false,
    noEggs: false,
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes(DEFAULT_QUERY); // Fetch recipes with default query on component mount
  }, []);

  const fetchRecipes = async (query) => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      setOriginalRecipes(response.data.hits);
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleFilterChange = (filterName) => {
    setFilters({ ...filters, [filterName]: !filters[filterName] });
  };

  const handleReadMore = (recipe) => {
    setSelectedRecipe(recipe);
  };

  useEffect(() => {
    const filteredRecipes = originalRecipes.filter((recipe) => {
      const { vegetarian, glutenFree, noEggs } = filters;
      const { healthLabels } = recipe.recipe;

      if (vegetarian && !healthLabels.includes('Vegetarian')) {
        return false;
      }
      if (glutenFree && !healthLabels.includes('Gluten-Free')) {
        return false;
      }
      if (noEggs && healthLabels.includes('No Eggs')) {
        return false;
      }

      return true;
    });

    setRecipes(filteredRecipes);
  }, [filters, originalRecipes]);

  return (
    <div>
      <h1>Recommended Recipes</h1>
      <div className="filter-options">
        <label className="filter-label">
          <input
            type="checkbox"
            checked={filters.vegetarian}
            onChange={() => handleFilterChange('vegetarian')}
          />
          Vegetarian
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={filters.glutenFree}
            onChange={() => handleFilterChange('glutenFree')}
          />
          Gluten-Free
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={filters.noEggs}
            onChange={() => handleFilterChange('noEggs')}
          />
          No Eggs
        </label>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Card key={recipe.recipe.uri} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={recipe.recipe.image} />
            <Card.Body>
              <Card.Title>{recipe.recipe.label}</Card.Title>
              <Button variant="outline-dark" onClick={() => handleReadMore(recipe)}>
                Read more
              </Button>
            </Card.Body>
            {selectedRecipe && selectedRecipe.recipe.uri === recipe.recipe.uri && (
              <Card.Footer>
                <h4>{selectedRecipe.recipe.label}</h4>
                <p>Author: {selectedRecipe.recipe.source}</p>
                <p>Prep time: {selectedRecipe.recipe.totalTime}</p>
                <p>Cooking time: {selectedRecipe.recipe.cookTime}</p>
                <h4>Ingredients</h4>
                <ul>
                  {selectedRecipe.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.text}</li>
                  ))}
                </ul>
                <h4>Instructions</h4>
                <ol>
                  {selectedRecipe.recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </Card.Footer>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RecipesList;