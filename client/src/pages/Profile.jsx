import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Profile() {
  const [image, setImage] = useState(null);
  const [roboflowData, setRoboflowData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [finalIngredients, setFinalIngredients] = useState([]);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [formattedIngredientsList, setFormattedIngredientsList] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
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
  }, []);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageData = reader.result;

      try {
        const response = await axios({
          method: "POST",
          url: "https://detect.roboflow.com/aicook-lcv4d/3",
          params: {
            api_key: "t37wtQdpUC2586fdcs4t"
          },
          data: imageData.split(',')[1],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
        setRoboflowData(response.data);
        setImage(imageData);
        // Set initial final ingredients based on detected ingredients
        setFinalIngredients(response.data.predictions.map((prediction) => ({
          name: prediction.class.replace(/_/g, ' '),
          confidence: prediction.confidence
        })));
      } catch (error) {
        console.log(error.message);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setRoboflowData(null);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...finalIngredients];
    updatedIngredients.splice(index, 1);
    setFinalIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    if (newIngredientName) {
      setFinalIngredients([
        ...finalIngredients,
        {
          name: newIngredientName,
          confidence: 1.00 // 100%
        }
      ]);
      setNewIngredientName('');
    }
  };

  const handleSubmitFinalIngredients = () => {
    // Create a new array without duplicates and without CI information
    const uniqueIngredients = Array.from(new Set(finalIngredients.map(ingredient => ingredient.name)));

    // Create a string with comma-separated items
    const formattedIngredients = uniqueIngredients.join(', ');

    // Update the state with the formatted ingredients
    setFormattedIngredientsList(formattedIngredients);
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h3>Snap a picture of your fridge</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleImageUpload}>Upload Image</button>
            {image && (
              <button onClick={handleRemoveImage}>Remove Image</button>
            )}
            {roboflowData && (
              <button onClick={handleSubmitFinalIngredients}>Submit Final Ingredients</button>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {image && (
            <div style={{ display: 'inline-block' }}>
              <h3>Uploaded Image:</h3>
              <img
                src={image}
                alt="Uploaded"
                style={{
                  maxWidth: '50%',
                  maxHeight: '50vh',
                }}
              />
            </div>
          )}
          {roboflowData && (
            <div>
              <h3>Final Ingredients:</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {finalIngredients.map((ingredient, index) => (
                  <div key={index}>
                    {ingredient.name} - {formatPercentage(ingredient.confidence)}{' '}
                    <button onClick={() => handleDeleteIngredient(index)}>Delete</button>
                  </div>
                ))}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter ingredient name"
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)}
                />
                <button onClick={handleAddIngredient}>Add Ingredient</button>
              </div>
            </div>
          )}
          {formattedIngredientsList && (
            <div>
              <h3>Formatted Ingredients:</h3>
              <p>{formattedIngredientsList}</p>
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