import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function CustomDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/upload-custom-list/${id}`);
                setRecipe(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <>
            <div className="div-2" style={{ backgroundColor: '#f0ece1', paddingBottom: '20px' }}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" alt="About Us" className="img-2" />
            </div>
            <div style={{ marginTop: '50px' }}>
                {recipe && (
                    <div style={{ padding: '50px' }}>
                        <h1 style={{fontFamily: 'Georgia'}}>{recipe.recipeName}</h1>
                        <img src={recipe.recipePic} alt={recipe.recipeName} />
                        <h2 style={{ display: 'flex', marginLeft: '200px', fontFamily: 'Lucida Console' }}>Ingredients</h2>
                        <ul style={{ listStyle: 'disc', padding: 0, marginLeft: '200px'  }}>
                            {recipe.ingredients.split(',').map((ingredient, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: 5 }}>•</span>
                                    <span>{ingredient.trim()}</span>
                                </li>
                            ))}
                        </ul>
                        <h2 style={{ display: 'flex', marginLeft: '200px', fontFamily: 'Lucida Console' }}>Instructions</h2>
                        <ul style={{ padding: 0, marginLeft: '200px'  }}>
                            {recipe.recipeText.split('\n').map((instruction, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: 5 }}>{index + 1}.</span>
                                    <span style={{fontFamily: 'Helvetica'}} >{instruction}</span>
                                </li>
                            ))}
                        </ul>


                    </div>
                )}
            </div>
        </>
    );

}
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
export default CustomDetail;
