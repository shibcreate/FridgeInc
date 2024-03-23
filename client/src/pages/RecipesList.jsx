import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const APP_ID = '67d82505';
const APP_KEY = '6cc2264f11d4364c5dfdab7aab84538f';
const DEFAULT_QUERY = 'rose, milk'; // Default search query

function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    vegetarian: false,
    glutenFree: false,
    noEggs: false,
  });

  // State variables to track likes and dislikes
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  useEffect(() => {
    fetchRecipes(DEFAULT_QUERY); // Fetch recipes with default query on component mount
  }, []);

  const fetchRecipes = async (query) => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      console.log('API response:', response.data); // Log the API response to inspect data
      setRecipes(response.data.hits);

      // Initialize likes and dislikes state objects for each recipe
      const initialLikes = {};
      const initialDislikes = {};
      response.data.hits.forEach((recipe) => {
        initialLikes[recipe.recipe.uri] = 0;
        initialDislikes[recipe.recipe.uri] = 0;
      });
      setLikes(initialLikes);
      setDislikes(initialDislikes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: !prevFilters[filterName] }));
  };

  const handleLike = (uri) => {
    if (likes[uri] === 0 && dislikes[uri] === 0) {
      setLikes({ ...likes, [uri]: 1 });
      setDislikes({ ...dislikes, [uri]: 0 });
    } else if (likes[uri] === 1) {
      setLikes({ ...likes, [uri]: 0 });
    }
  };

  const handleDislike = (uri) => {
    if (dislikes[uri] === 0 && likes[uri] === 0) {
      setDislikes({ ...dislikes, [uri]: 1 });
      setLikes({ ...likes, [uri]: 0 });
    } else if (dislikes[uri] === 1) {
      setDislikes({ ...dislikes, [uri]: 0 });
    }
  };

  const filterRecipes = (recipe) => {
    if (filters.vegetarian && !recipe.recipe.healthLabels.includes('Vegetarian')) {
      return false;
    }
    if (filters.glutenFree && !recipe.recipe.healthLabels.includes('Gluten-Free')) {
      return false;
    }
    if (filters.noEggs && recipe.recipe.ingredients.some((ingredient) => ingredient.text.toLowerCase().includes('egg'))) {
      return false;
    }
    return true;
  };

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
        {recipes &&
          recipes.filter(filterRecipes).map((recipe, index) => (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={recipe.recipe.image} />
              <Card.Body>
                <h3 style={{ marginBottom: '10px', color: 'blue', fontFamily: 'Arial' }}>{recipe.recipe.label}</h3>
                <Card.Text style={{ fontSize: '14px', marginBottom: '15px' }}>
                  <h4>Ingredients</h4>
                  <ul>
                    {recipe.recipe.ingredients &&
                      recipe.recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.text}</li>
                      ))}
                  </ul>
                </Card.Text>
                <div className="button-group">
                  <Button variant={likes[recipe.recipe.uri] === 1 ? 'success' : 'outline-success'} onClick={() => handleLike(recipe.recipe.uri)}>
                    Like
                  </Button>
                  <Button variant={dislikes[recipe.recipe.uri] === 1 ? 'danger' : 'outline-danger'} onClick={() => handleDislike(recipe.recipe.uri)} style={{ marginLeft: '10px' }}>
                    Dislike
                  </Button>
                  <Button variant="primary" href={recipe.recipe.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px', width: '100%' }}>
                    View Preparation
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default RecipesList;