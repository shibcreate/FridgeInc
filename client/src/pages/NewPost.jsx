import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function NewPost({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();
    const {email, name} = location.state || {};
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipeText, setRecipeText] = useState('');


    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:3001/share-recipe', {
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
          const response = await fetch('http://localhost:3001/upload-custom-recipes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, recipeName, ingredients, recipeText }),
          });
    
          if (response.ok) {
            console.log('Custom recipe saved successfully!');
          } else {
            console.error('Failed to save custom recipe :(');
          }
        } catch (error) {
          console.error('Error saving custom recipe:', error);
        }
      };


    return (
    <div className="d-flex flex-column align-items-center">
        {isLoggedIn ? (
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Label>Recipe Title</Form.Label>
                        <Form.Control
                            required
                            placeholder="Enter recipe name..."
                            onChange = {(e) => setRecipeName(e.target.value)}
                        />
                    </Form.Group>

                    {/*     will come back to pic upload later
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload your recipe image</Form.Label>
                        <Form.Control type="file" placeholder='Upload image'/>
                    </Form.Group>
                    */}
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Ingredient List</Form.Label>
                        <Form.Control
                            required
                            placeholder="Ingredients"
                            onChange = {(e) => setIngredients(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Preparation</Form.Label>
                        <Form.Control as="textarea" placeholder="Preparation" rows={5} 
                        onChange = {(e) => setRecipeText(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mb-3" onClick = {saveCustomRecipes}>
                        Save and Post
                    </Button>
                </Form>
            ) : (
                <p>Please join us to share your recipes.</p>
            )}
        </div>
    );
}
