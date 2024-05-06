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
                const response = await axios.get('http://localhost:3001/posts',
                    { withCredentials: true, });
                setPosts(response.data.posts);
                console.log('Successfully fetch users posts')
            } catch (error) {
                console.log('Error fetching users posts')
            }
        }
        fetchUserPosts();
    }, []);

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/posts/${postId}`,
                { withCredentials: true });
            if (response.status === 200) {
                // Remove the deleted post from the state
                setPosts(posts.filter(post => post._id !== postId));
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    const maxPreparationLength = 50;
    return (
        <>
            <div className="div-2" style={{ marginBottom: '20px' }}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" alt="About Us" className="img-2" />
                <div className="div-12">Your Recipes</div>
            </div>
            <div className="container">
                <Link to="/share-recipe">
                    <Button variant="primary" style={{ backgroundColor: '#d97255', borderColor: '#d97255', margin: '20px' }}>
                        New Recipe
                    </Button>
                </Link>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div className="row">
                        {posts.map((post, index) => (
                            <div key={index} className="col-lg-4 mb-3">
                                <div className="card" style={{ padding: '10px' }}>
                                    <img src={post.recipePic} className="card-img-top" alt={post.recipePic} />
                                    <div className="card-body">
                                        <h3 className="card-title" style={{ fontFamily: 'Arial', color: '#d97255', marginBottom: '15px' }}>{post.recipeName}</h3>
                                        <h4 className="card-text"> Ingredients: </h4>

                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {post.ingredients && post.ingredients.split(',').map((ingredient, index) => (
                                                <li key={index}>{ingredient.trim()}</li>
                                            ))}
                                        </ul>

                                        <h4 className="card-text"> Preparation: <br></br> </h4>
                                        <p style={{ whiteSpace: 'pre-line' }}> {post.recipeText.length > maxPreparationLength ?
                                            post.recipeText.substring(0, maxPreparationLength) + '...' :
                                            post.recipeText
                                        }</p>
                                    </div>
                                    <Link to={`/posts/${post._id}`} className="btn btn-info mr-2">Edit Details</Link>
                                    <Button variant="danger" style={{ marginTop: '10px', width: '100%' }} onClick={() => deletePost(post._id)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
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

export default UserPosts;
