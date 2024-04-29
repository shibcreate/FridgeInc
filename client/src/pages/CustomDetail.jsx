import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CustomDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                // Make a GET request to your backend API endpoint using the id parameter
                const response = await axios.get(`http://localhost:3001/upload-custom-list/${id}`);
                setRecipe(response.data); // Assuming your backend returns the recipe data as JSON
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div>
            {recipe && (
                <div>
                    <h1>{recipe.recipeName}</h1>
                    <img src={recipe.recipePic} alt={recipe.recipeName} />
                    <h2>Ingredients</h2>
                    <ul style={{ listStyle: 'none', padding: 0}}>
                        {recipe.ingredients.split(',').map((ingredient, index) => (
                            <li key={index}>{ingredient.trim()}</li>
                        ))}
                    </ul>
                    <h2>Instructions</h2>
                    <p>{recipe.recipeText}</p>
                </div>
            )}
        </div>
    );
    
}

export default CustomDetail;
