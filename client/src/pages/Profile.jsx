import React, { useState, useRef } from 'react';
import { ObjectDetector } from "./objectD/objectDetector";

function Profile() {
  const [image, setImage] = useState(null);
  const [imageDataForTensorFlow, setImageDataForTensorFlow] = useState(null);
  const fileInputRef = useRef();

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
  );
}

export default Profile;