import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

export default function CustomList({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();
    const { email, name } = location.state || {};
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching custom recipes:', error);
            }
        };
        fetchRecipes();
    }, [searchQuery]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="div-2" style={{ marginBottom: '20px' }}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" alt="About Us" className="img-2" />
                <div className="div-12">Custom Recipes</div>
            </div>
            <div className="container">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search by recipe name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <div className="row">
                        {customList.map((recipe, index) => (
                            <div key={recipe._id} className="col-lg-4 mb-3">
                                <div className="card">
                                    <img src={recipe.recipePic} className="card-img-top" alt={recipe.recipeName} />
                                    <div className="card-body">
                                        <h3 style={{fontFamily: 'Arial', color: '#d97255', marginBottom: '20px'}} className="card-title">{recipe.recipeName}</h3>
                                        <h4 className="card-text">Ingredients: <br /></h4>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {recipe.ingredients && recipe.ingredients.split(',').map((ingredient, index) => (
                                                <li key={index}>{ingredient.trim()}</li>
                                            ))}
                                        </ul>
                                        <Link 
                                            to={`/custom-list/${recipe._id}`} 
                                            className="btn btn-primary" 
                                            style={{ backgroundColor: '#d97255', borderColor: '#d97255' }}>
                                            View Recipe
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <style jsx>{`
                .div-2 {
                    background-color: #f0ece1;
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    align-items: center;
                    color: #3e2723;
                    padding: 19px 12px 69px;
                }

                .img-2 {
                    aspect-ratio: 1.25;
                    object-fit: auto;
                    object-position: center;
                    width: 83px;
                    margin-top: 56px;
                }

                .div-12 {
                    margin-top: 33px;
                    font: 700 54px/107% Raleway, -apple-system, Roboto, Helvetica,
                    sans-serif;
                }
            `}</style>
        </>
    );
}
