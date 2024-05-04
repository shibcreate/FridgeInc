import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function EditPost() {
    const { postId } = useParams();
    const [formData, setFormData] = useState({
        recipeName: '',
        author: '',
        recipeText: '',
        recipePic: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    // Function to fetch post data when component mounts
    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await axios.get(`http://localhost:3001/custom-list/posts/${postId}`);
                setFormData(response.data.post);
            } catch (error) {
                setError('Error fetching post data: ' + error.message);
            }
        }
        fetchPostData();
    }, [postId]);

    // Function to handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/custom-list/posts/${postId}`, formData);
            if (response.status === 200) {
                setSuccessMessage('Post updated successfully');
                navigate('/custom-list/posts');
            }
        } catch (error) {
            setError('Error updating post: ' + error.message);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h2>Edit Post</h2>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="recipeName">
                    <Form.Label>Recipe Name:</Form.Label>
                    <Form.Control type="text" name="recipeName" value={formData.recipeName} onChange={handleInputChange} />
                </Form.Group>
                {/* <Form.Group controlId="recipePic">
                    <Form.Label>Recipe Picture:</Form.Label>
                    <Form.Control type="text" name="recipePic" value={formData.recipePic} onChange={handleInputChange} />
                </Form.Group> */}
                <Form.Group controlId="author">
                    <Form.Label>Author:</Form.Label>
                    <Form.Control type="text" name="author" value={formData.name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="ingredients">
                    <Form.Label>Ingredients List:</Form.Label>
                    <Form.Control type="text" name="ingredients" value={formData.ingredients} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="recipeText">
                    <Form.Label>Recipe:</Form.Label>
                    <Form.Control as="textarea" rows={3} name="recipeText" value={formData.recipeText} onChange={handleInputChange} />
                </Form.Group>
                <Button style={{ marginTop: '10px', width: '75%' }} variant="primary" type="submit">Update Post</Button>
            </Form>
            <Link to="/custom-list/posts">
                <Button style={{ marginTop: '10px', width: '100%' }} variant="warning">Cancel</Button>
            </Link>
        </div>
    );
}

export default EditPost;
