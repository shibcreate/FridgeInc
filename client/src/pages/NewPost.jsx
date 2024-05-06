import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function NewPost({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();
    const { email, name } = location.state || {};
    const [recipeName, setRecipeName] = useState('');
    const [recipePic, setRecipePic] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipeText, setRecipeText] = useState('');

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

    const saveCustomRecipes = async () => {
        try {
            const response = await axios.post('http://localhost:3001/upload-custom-recipes', {
                name,
                email,
                recipeName,
                recipePic,
                ingredients,
                recipeText
            }, {
                withCredentials: true 
            });
    
            if (response.status === 200) {
                console.log('Custom recipe saved successfully!');
            } else {
                console.error('Failed to save custom recipe :(');
            }
        } catch (error) {
            console.error('Error saving custom recipe:', error);
        }
    };
    

    const convertToBase64 = (e) => {
        var reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setRecipePic(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="div-2">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" alt="About Us" className="img-2" />
                <div className="div-12">New Post</div>
            </div>
            <div className="d-flex flex-column align-items-center">
                {isLoggedIn ? (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Title</Form.Label>
                            <Form.Control
                                required
                                placeholder="Enter recipe name..."
                                onChange={(e) => setRecipeName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload your recipe image</Form.Label><br></br>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={(e) => { convertToBase64(e) }
                                }
                            />

                            <br></br>
                            {recipePic === "" || recipePic === null ? "" : <img width={100} height={100} src={recipePic} />}

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingredient List</Form.Label>
                            <Form.Control
                                required
                                placeholder="Ingredients"
                                onChange={(e) => setIngredients(e.target.value)}
                            />

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Preparation</Form.Label>
                            <Form.Control as="textarea" placeholder="Preparation" rows={5}
                                onChange={(e) => setRecipeText(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mb-3" onClick={saveCustomRecipes} style={{ backgroundColor: '#d97255', border: '1px solid #d97255' }}>
                            Save and Post
                        </Button>
                    </Form>
                ) : (
                    <h5>Please join us to share your recipes.</h5>
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
