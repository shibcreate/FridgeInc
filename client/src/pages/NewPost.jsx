import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function NewPost({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();
    const {email, name} = location.state || {};
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
          const response = await fetch('http://localhost:3001/upload-custom-recipes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, recipeName, recipePic, ingredients, recipeText }),
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

    const convertToBase64 = (e) => {
        console.log(e);
        var reader = new FileReader(); //file reader
        const fileToString = reader.readAsDataURL(e.target.files[0]);    //turning into string to store
        reader.onload = () =>{
            console.log(reader.result);
            setRecipePic(reader.result);
        }

        reader.onerror = error => {
            console.log("Error selecting file ", error);
            
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

                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload your recipe image</Form.Label><br></br>
                        <input
                        accept="image/*"
                        type="file"
                        onChange={(e) => {convertToBase64(e)}
                        }
                        />

                        <br></br>
                        {recipePic == "" || recipePic == null?"" : <img width = {100} height = {100} src = {recipePic} />}

                    </Form.Group>
                    
                    
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
                <h5>Please join us to share your recipes.</h5>
            )}
        </div>
    );
}