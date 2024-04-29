import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

export default function CustomList({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();
    const { email, name } = location.state || {};

    const [recipeName, setRecipeName] = useState('');
    const [recipePic, setRecipePic] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipeText, setRecipeText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [customList, setCustomList] = useState([]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:3001/authorized', {
                    withCredentials: true
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkAuthentication();
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                let url = 'http://localhost:3001/upload-custom-list';
                if (searchQuery) {
                    url += `?recipeName=${encodeURIComponent(searchQuery)}`;
                }
                const response = await axios.get(url);
                setCustomList(response.data);
            } catch (error) {
                console.error('Error fetching custom recipes:', error);
            }
        };
        fetchRecipes();
    }, [searchQuery]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const toggleShowMore = (index) => {
        const updatedCustomList = [...customList];
        updatedCustomList[index].showMore = !updatedCustomList[index].showMore;
        setCustomList(updatedCustomList);
    }

    return (
        <div className="container">
            <h1 className="mt-3">Custom Recipes</h1>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by recipe name..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="row">
                {customList.map((recipe, index) => (
                    <div key={recipe._id} className="col-lg-4 mb-3">
                        <div className="card">
                            <img src={recipe.recipePic} className="card-img-top" alt={recipe.recipeName} />
                            <div className="card-body">
                                <h3 className="card-title">{recipe.recipeName}</h3>
                                <h4 className="card-text">
                                    Ingredients: <br></br> </h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {recipe.ingredients.split(',').map((ingredient, index) => (
                                        <li key={index}>{ingredient.trim()}</li>
                                    ))}
                                </ul>
                                <button className="btn btn-link" onClick={() => toggleShowMore(index)}>
                                    {recipe.showMore ? 'Show Less' : 'Show More'}
                                </button>
                                {/* Add a Link to view the full recipe */}
                                <Link to={`/custom-list/${recipe._id}`} className="btn btn-primary">View Recipe</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
