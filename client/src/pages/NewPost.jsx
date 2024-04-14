import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function NewPost({ isLoggedIn, setIsLoggedIn }) {
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

    return (
        <div>
            {isLoggedIn ? (
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            placeholder="Enter recipe name"
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload your recipe image</Form.Label>
                        <Form.Control type="file" placeholder='Upload image'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control
                            as="textarea" rows={3}
                            placeholder="Ingredients"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Preparation</Form.Label>
                        <Form.Control as="textarea" placeholder="Preparation" rows={5} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mb-3">
                        Share
                    </Button>
                </Form>
            ) : (
                <p>Please join us to share your recipes.</p>
            )}
        </div>
    );
}
