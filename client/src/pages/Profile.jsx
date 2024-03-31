import React, { useState, useEffect, useRef } from 'react';
import { ObjectDetector } from "./objectD/objectDetector";
import axios from 'axios';

function Profile() {
  const [image, setImage] = useState(null);
  const [imageDataForTensorFlow, setImageDataForTensorFlow] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage authentication status
  const fileInputRef = useRef();

  useEffect(() => {
    // Fetch the user's authentication status from the server
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', {
          withCredentials: true
        });
        if (response.data === 'profile page') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuthentication();
  }, []); // Run only once when the component mounts

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      setImage(imageData);
      setImageDataForTensorFlow(imageData.split(',')[1]); // Extracting the Base64 encoded data
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageDataForTensorFlow(null);
  };

  return (
    <div>
      {isLoggedIn ? ( // Render content only if the user is logged in
        <div>
          <h1>Profile</h1>
          <h3>Snap a picture of your fridge</h3>
          <button onClick={handleImageUpload}>Upload Image</button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {image && (
            <div>
              <button onClick={handleRemoveImage}>Remove Image</button>
              <div style={{ display: 'inline-block' }}>
                <h3>Uploaded Image:</h3>
                <img
                  src={image}
                  alt="Uploaded"
                  style={{
                    maxWidth: '50%',
                    maxHeight: '50vh',
                    border: '2px solid black',
                  }}
                />
              </div>
              <ObjectDetector image={image} />
            </div>
          )}
          {/* for Tensorflow */}
          {imageDataForTensorFlow && (
            <div style={{ display: 'none' }}>
              <p>Image data for TensorFlow:</p>
              <textarea value={imageDataForTensorFlow} readOnly />
            </div>
          )}
        </div>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
}

export default Profile;