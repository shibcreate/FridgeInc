import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component for loader

const APP_ID = '41d4abc9';
const APP_KEY = 'efc1af159e76c89641e1fadf0876a50e';
const DEFAULT_QUERY = 'popular'; // Default search query

export default function RecipesList({ isLoggedIn, setIsLoggedIn }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [filters, setFilters] = useState({
    vegetarian: false,
    glutenFree: false,
    noEggs: false,
    lowFat: false,
    highProtein: false,
    vegan: false,
    nutFree: false,
    lowSodium: false,
  });
  const [email, setEmail] = useState('');
  const [likes, setLikes] = useState({});
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [showLikesOnly, setShowLikesOnly] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [formattedIngredients, setFormattedIngredients] = useState('');

  const removeLastIngredient = async () => {
    // Update formattedIngredients with the value from localStorage
    const formattedIngredients = localStorage.getItem('formattedIngredients') || '';

    if (!formattedIngredients) {
      console.log('No ingredients to remove.');
      return;
    }

    const ingredientsArray = formattedIngredients.split(',');

    if (ingredientsArray.length > 1) {
      ingredientsArray.pop();
      ingredientsArray.pop();
    }

    const newFormattedIngredients = ingredientsArray.map(ingredient => ingredient.trim()).join(', ');
    console.log('New ingredients:', newFormattedIngredients);
    setFormattedIngredients(newFormattedIngredients);

    // Save the updated ingredients list to localStorage
    localStorage.setItem('formattedIngredients', newFormattedIngredients);

    // Fetch new recipes with the updated ingredients list only if it's not empty
    if (newFormattedIngredients !== '') {
      await fetchRecipes(newFormattedIngredients);
    } else {
      // If newFormattedIngredients is empty, fetch recipes for the stored default query
      await fetchRecipes(storedDefaultQuery);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3001/authorized', {
          withCredentials: true
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          console.log('Authorized user')
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.log('User not authorized')
      }
    };
    checkAuthentication();
  }, [isLoggedIn]);

  const getRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes', {
        withCredentials: true
      });
      if (response.data === 'recipe list') {
        console.log('Recipes page access successfully!')
      }
    } catch (error) {
      console.log('Failted to access recipes page!')
    }
  };

  useEffect(() => {
    const storedDefaultQuery = localStorage.getItem('formattedIngredients');
    const fetchRecipesWithQuery = storedDefaultQuery ? storedDefaultQuery : DEFAULT_QUERY;
    fetchRecipes(fetchRecipesWithQuery);
  }, [userQuery]);


  const fetchRecipes = async (query) => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      console.log('API response:', response.data);
      setRecipes(response.data.hits);
      setLoading(false); // Set loading to false once data is fetched

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

    // Check each filter separately
    if (filters.noEggs && recipe.recipe.ingredients.some((ingredient) => ingredient.text.toLowerCase().includes('egg'))) {
      return false;
    }
    if (filters.vegetarian && !recipe.recipe.healthLabels.includes('Vegetarian')) {
      return false;
    }
    if (filters.glutenFree && !recipe.recipe.healthLabels.includes('Gluten-Free')) {
      return false;
    }
    if (filters.lowFat && !recipe.recipe.healthLabels.includes('Low-Fat')) {
      return false;
    }
    if (filters.highProtein && !recipe.recipe.healthLabels.includes('High-Protein')) {
      return false;
    }
    if (filters.vegan && !recipe.recipe.healthLabels.includes('Vegan')) {
      return false;
    }
    if (filters.nutFree && recipe.recipe.healthLabels.includes('Peanuts') || recipe.recipe.healthLabels.includes('Tree-Nuts')) {
      return false;
    }
    if (filters.lowSodium && !recipe.recipe.healthLabels.includes('Low-Sodium')) {
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

      const newFilters = {};
      for (const filter in response.data.dietPreference) {
        newFilters[response.data.dietPreference[filter]] = true;
      }
      setFilters(newFilters);

      const storedDefaultQuery = localStorage.getItem('formattedIngredients');
      fetchRecipes(storedDefaultQuery ? storedDefaultQuery : DEFAULT_QUERY);

      setEmail('');
    } catch (error) {
      console.error('Error importing preferences:', error);
    }
  };

  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&"
            className="img-2"
          />
          <div className="div-12">Recommended Recipes</div>
        </div>
      </div>
      <div>
        <div>
          <div className="user-query">
            <div style={{ height: '10px' }} />
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Enter your query"
            />
            <button onClick={() => fetchRecipes(userQuery)}>Search</button>
            <div style={{ height: '20px' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onClick={importPreferences}
              style={{ backgroundColor: '#d97255', borderColor: '#d97255', color: '#ffffff', marginRight: '10px' }}
            >
              Import Preferences
            </Button>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{ marginRight: '10px' }}
            />

          </div>
          <div style={{ height: '20px' }} />
        </div>
      </div>
      <div className="container">
        <div className="div-13">
          <div className="div-14">Filters</div>
          <Button onClick={removeLastIngredient} style={{ backgroundColor: '#d97255', borderColor: '#d97255', color: '#ffffff' }}>Check with Less Ingredients</Button>
          <div style={{ height: '20px' }} />
          <Button
            onClick={() => setShowLikesOnly(!showLikesOnly)}
            style={{
              backgroundColor: '#d97255',
              borderColor: '#d97255',
              color: '#ffffff'
            }}
          >
            {showLikesOnly ? 'Show All Recipes' : 'Show Likes Only'}
          </Button>

          <div className="filter-item">
            <input type="checkbox" checked={filters.vegetarian} onChange={() => handleFilterChange('vegetarian')} />
            <label> Vegetarian</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" checked={filters.glutenFree} onChange={() => handleFilterChange('glutenFree')} />
            <label> Gluten Free</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" checked={filters.noEggs} onChange={() => handleFilterChange('noEggs')} />
            <label> No Eggs</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" checked={filters.lowFat} onChange={() => handleFilterChange('lowFat')} />
            <label> Low-Fat</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" checked={filters.highProtein} onChange={() => handleFilterChange('highProtein')} />
            <label> High-Protein</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" checked={filters.vegan} onChange={() => handleFilterChange('vegan')} />
            <label> Vegan</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" checked={filters.nutFree} onChange={() => handleFilterChange('nutFree')} />
            <label> Nut Free</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" checked={filters.lowSodium} onChange={() => handleFilterChange('lowSodium')} />
            <label> Low Sodium</label>
          </div>
        </div>
        <div className="recipe-grid">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <>
              {recipes &&
                (showLikesOnly ? likedRecipes.map((uri) => recipes.find((recipe) => recipe.recipe.uri === uri)) : recipes)
                  .filter(filterRecipes)
                  .map((recipe, index) => (
                    <div key={index} className="card-wrapper">
                      <Card style={{ width: '18rem', display: 'flex', flexDirection: 'column' }}>
                        <Card.Img variant="top" src={recipe.recipe.image} />
                        <Card.Body style={{ flexGrow: 1 }}>
                          <h3 style={{ marginBottom: '10px', color: '#d97255', fontFamily: 'Arial' }}>{recipe.recipe.label}</h3>
                          <h4>Ingredients</h4>
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {recipe.recipe.ingredients &&
                              recipe.recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.text}</li>
                              ))}
                          </ul>
                        </Card.Body>
                        <div className="button-group" style={{ marginTop: 'auto', marginBottom: '0px', textAlign: 'center' }}>
                          <Button variant={likes[recipe.recipe.uri] === 1 ? 'success' : 'outline-success'} onClick={() => handleLike(recipe.recipe.uri)}>
                            Like
                          </Button>
                          <Button
                            variant="primary"
                            href={recipe.recipe.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              marginTop: '10px',
                              width: '100%',
                              backgroundColor: '#d97255', // Add this line to set the background color
                              borderColor: '#d97255', // Add this line to set the border color
                            }}>
                            View Preparation
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))}
            </>
          )}
        </div>
      </div>
      <style jsx>{`
    .div {
      background-color: #fff;
      display: flex;
      padding-bottom: 50px;
      flex-direction: column;
      color: #3e2723;
    }
    .div-2 {
      background-color: #f0ece1;
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      padding: 19px 12px 58px;
    }
    @media (max-width: 991px) {
      .div-2 {
        max-width: 100%;
        padding-right: 20px;
      }
    }
    .div-12 {
      margin-top: 33px;
      font: 700 54px/107% Raleway, -apple-system, Roboto, Helvetica, sans-serif;
    }
    @media (max-width: 991px) {
      .div-12 {
        max-width: 100%;
        font-size: 40px;
      }
    }
    .img-2 {
      aspect-ratio: 1.25;
      object-fit: auto;
      object-position: center;
      width: 83px;
      margin-top: 56px;
    }
    @media (max-width: 991px) {
      .img-2 {
        margin-top: 40px;
      }
    }
    .container {
      display: flex;
    }
    .div-13 {
      margin-right: 20px;
      align-self: start;
      display: flex;
      flex-direction: column;
      align-items: start;
      font-size: 20px;
      font-weight: 400;
      line-height: 290%;
    }
    @media (max-width: 991px) {
      .container {
        flex-direction: column;
      }
      .div-13 {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
    .div-14 {
      align-self: stretch;
      font: 600 42px/181% Inter, -apple-system, Roboto, Helvetica, sans-serif;
    }
    .recipe-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex: 1;
    }
    .card-wrapper {
      flex: 0 0 calc(33.33% - 20px);
      margin-bottom: 20px;
    }
  `}</style>
    </>
  );
}

