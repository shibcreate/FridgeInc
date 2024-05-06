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
                const response = await axios.get(`http://localhost:3001/posts/${postId}`);
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
            const response = await axios.put(`http://localhost:3001/posts/${postId}`, formData);
            if (response.status === 200) {
                setSuccessMessage('Post updated successfully');
                navigate('/posts');
            }
        } catch (error) {
            setError('Error updating post: ' + error.message);
        }
    };

    return (
        <>
            <div className="div-2" style={{ marginBottom: '20px' }}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" alt="About Us" className="img-2" />
                <div className="div-12">Edit Post</div>
            </div>
            <div className="d-flex flex-column align-items-center">
                {error && <p>{error}</p>}
                {successMessage && <p>{successMessage}</p>}
                <Form style={{ width: '50%' }} onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="recipeName">
                        <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Recipe Name:</Form.Label>
                        <Form.Control type="text" name="recipeName" value={formData.recipeName} onChange={handleInputChange} />
                    </Form.Group>
                    {/* <Form.Group controlId="recipePic">
                    <Form.Label>Recipe Picture:</Form.Label>
                    <Form.Control type="text" name="recipePic" value={formData.recipePic} onChange={handleInputChange} />
                </Form.Group> */}
                    <Form.Group className="mb-2" controlId="ingredients">
                        <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Ingredients List:</Form.Label>
                        <Form.Control type="text" name="ingredients" value={formData.ingredients} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="recipeText">
                        <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Preparation:</Form.Label>
                        <Form.Control as="textarea" rows={7} name="recipeText" value={formData.recipeText} onChange={handleInputChange} />
                    </Form.Group>
                    <Button style={{ marginTop: '10px', width: '15%' }} variant="primary" type="submit">Update Post</Button>
                </Form>
                <Link to="/posts">
                    <Button style={{ marginTop: '10px', width: '100%' }} variant="warning">Cancel</Button>
                </Link>
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


export default EditPost;
