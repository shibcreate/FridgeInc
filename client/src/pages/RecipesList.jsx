import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const APP_ID = '67d82505';
const APP_KEY = '6cc2264f11d4364c5dfdab7aab84538f';
const DEFAULT_QUERY = 'popular'; // Default search query

export default function RecipesList({isLoggedIn, setIsLoggedIn}) {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    vegetarian: false,
    glutenFree: false,
    noEggs: false,
  });
  const [email, setEmail] = useState('');
  const [likes, setLikes] = useState({});
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [showLikesOnly, setShowLikesOnly] = useState(false); // New state for showLikesOnly
  

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes', {
          withCredentials: true
        });
        if (response.data === 'recipe list') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuthentication();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedDefaultQuery = localStorage.getItem('formattedIngredients');
      fetchRecipes(storedDefaultQuery ? storedDefaultQuery : DEFAULT_QUERY);
    }
  }, [isLoggedIn]);

  const fetchRecipes = async (query) => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      console.log('API response:', response.data);
      setRecipes(response.data.hits);

      const initialLikes = {};
      response.data.hits.forEach((recipe) => {
        initialLikes[recipe.recipe.uri] = 0;
      });
      setLikes(initialLikes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: !prevFilters[filterName] }));
  };

  const handleLike = (uri) => {
    setLikedRecipes((prevLikedRecipes) => {
      if (prevLikedRecipes.includes(uri)) {
        return prevLikedRecipes.filter((likedUri) => likedUri !== uri);
      } else {
        return [...prevLikedRecipes, uri];
      }
    });

    setLikes({ ...likes, [uri]: likes[uri] === 0 ? 1 : 0 });
  };

  const filterRecipes = (recipe) => {
    if (showLikesOnly && !likedRecipes.includes(recipe.recipe.uri)) {
      return false; // Show only liked recipes if showLikesOnly is true
    }
    if (filters.noEggs && recipe.recipe.ingredients.some((ingredient) => ingredient.text.toLowerCase().includes('egg'))) {
      return false;
    }
    if (filters.vegetarian && !recipe.recipe.healthLabels.includes('Vegetarian')) {
      return false;
    }
    if (filters.glutenFree && !recipe.recipe.healthLabels.includes('Gluten-Free')) {
      return false;
    }
    if (filters.lowFat && recipe.recipe.healthLabels.includes('Low-Fat')) {
      return false;
    }
    if (filters.highProtein && recipe.recipe.healthLabels.includes('High-Protein')) {
      return false;
    }
    if (filters.vegan && !recipe.recipe.healthLabels.includes('Vegan')) {
      return false;
    }
    if (filters.nutFree && recipe.recipe.healthLabels.includes('Peanuts' || 'Tree-Nuts')) {
      return false;
    }
    if (filters.lowSodium && recipe.recipe.healthLabels.includes('Low-Sodium')) {
      return false;
    }
    return true;
  };

  const importPreferences = async () => {
    try {
      const response = await axios.post('http://localhost:3001/import-preferences', {
        email,
      });
      console.log('Import preferences response:', response.data);
  
      setFilters({
        noEggs: response.data.dietPreference.includes(1),
        vegetarian: response.data.dietPreference.includes(2),
        glutenFree: response.data.dietPreference.includes(3),
        lowFat: response.data.dietPreference.includes(4),
        highProtein: response.data.dietPreference.includes(5),
        vegan: response.data.dietPreference.includes(6),
        nutFree: response.data.dietPreference.includes(7),
        lowSodium: response.data.dietPreference.includes(8),
      });
  
      const storedDefaultQuery = localStorage.getItem('formattedIngredients');
      fetchRecipes(storedDefaultQuery ? storedDefaultQuery : DEFAULT_QUERY);
  
      setEmail('');
  
    } catch (error) {
      console.error('Error importing preferences:', error);
    }
  };  

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Found {recipes.length} recipe(s)</h2>
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
            <label className="filter-label">
            <input
              type="checkbox"
              checked={filters.lowFat}
              onChange={() => handleFilterChange('lowFat')}
            />
            Low-Fat
            </label>
            <label className="filter-label">
            <input
              type="checkbox"
              checked={filters.highProtein}
              onChange={() => handleFilterChange('highProtein')}
            />
            High-Protein
            </label>
            <label className="filter-label">
            <input
              type="checkbox"
              checked={filters.vegan}
              onChange={() => handleFilterChange('vegan')}
            />
            Vegan
            </label>
            <label className="filter-label">
            <input
              type="checkbox"
              checked={filters.nutFree}
              onChange={() => handleFilterChange('nutFree')}
            />
            Nut-Free
            </label>
            <label className="filter-label">
            <input
              type="checkbox"
              checked={filters.lowSodium}
              onChange={() => handleFilterChange('lowSodium')}
            />
            Low-Sodium
            </label>
            <div style={{ marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="primary" onClick={importPreferences} style={{ marginLeft: '10px' }}>
                Import Preferences
              </Button>
            </div>
          </div>
          <div className="toggle-likes-button">
            <Button variant="primary" onClick={() => setShowLikesOnly(!showLikesOnly)}>
              {showLikesOnly ? 'Show All Recipes' : 'Show Likes Only'}
            </Button>
          </div>
          <div className="recipe-grid">
            {recipes &&
              (showLikesOnly ? likedRecipes.map((uri) => recipes.find((recipe) => recipe.recipe.uri === uri)) : recipes)
                .filter(filterRecipes)
                .map((recipe, index) => (
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
                        <Button variant="primary" href={recipe.recipe.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px', width: '100%' }}>
                          View Preparation
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
          </div>
        </>
      ) : (
        <p>Please log in to view recipes</p>
      )}
    </div>
  );
}
