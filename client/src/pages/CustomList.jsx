import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function CustomList({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();
    const {email, name} = location.state || {};
    const [recipeName, setRecipeName] = useState('');
    const [recipePic, setRecipePic] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipeText, setRecipeText] = useState('');


    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:3001/custom-list', {
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

    {/*         WILL COME BACK TO THE PIC QUERY
    const uploadRecipePic = () => {
        fetch('http://localhost:3001/upload-recipe-pic', {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",

            },
            body: JSON.stringify({
                base64: recipePic
            }).then((res) => res.json()).then((data) => console.log(data))
        })
    }

*/}
    return (
        <div className="d-flex flex-column align-items-center">
                    <div>
                        

                        testing
                        
                    </div>
            </div>
        );
}