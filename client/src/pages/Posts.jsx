import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function UserPosts({ isLoggedIn, setIsLoggedIn }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

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
        async function fetchUserPosts() {
            try {
                const response = await axios.get('http://localhost:3001/custom-list/posts', { withCredentials: true });
                setPosts(response.data.posts);
            } catch (error) {
                setError('Error fetching user posts: ' + error.message);
            }
        }
        fetchUserPosts();
    }, []);

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/custom-list/posts/${postId}`, { withCredentials: true });
            if (response.status === 200) {
                // Remove the deleted post from the state
                setPosts(posts.filter(post => post._id !== postId));
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="container">
            <Link to="/share-recipe" className="btn btn-primary">New Recipe</Link>
            <h1 className="mt-3">Your Recipes</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <div className="row">
                    {posts.map((post, index) => (
                        <div key={index} className="col-lg-4 mb-3">
                            <div className="card" style={{ padding: '10px' }}>
                                <img src={post.recipePic} className="card-img-top" alt={post.recipePic} />
                                <div className="card-body">
                                    <h3 className="card-title">{post.recipeName}</h3>
                                    <h4 className="card-text"> Ingredients: </h4>

                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {post.ingredients && post.ingredients.split(',').map((ingredient, index) => (
                                            <li key={index}>{ingredient.trim()}</li>
                                        ))}
                                    </ul>

                                    <h4 className="card-text"> Preparation: <br></br> </h4>
                                    <p style={{ whiteSpace: 'pre-line' }}>{post.recipeText}</p>
                                </div>
                                <Link to={`/custom-list/posts/${post._id}`} className="btn btn-info mr-2">Edit Details</Link>
                                <Button variant="danger" style={{ marginTop: '10px', width: '100%' }} onClick={() => deletePost(post._id)}>Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserPosts;
