import React, { useState } from 'react';
import axios from 'axios';

export default function MyComponent() {
  const [image, setImage] = useState(null);
  const [finalIngredients, setFinalIngredients] = useState([]);
  const [newIngredientName, setNewIngredientName] = useState('');

  const handleImageUpload = () => {
    // Trigger file input click
    document.getElementById('fileInput').click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = async () => {
      const imageData = reader.result;
  
      try {
        const response = await axios({
          method: 'POST',
          url: 'https://detect.roboflow.com/aicook-lcv4d/3',
          params: {
            api_key: 't37wtQdpUC2586fdcs4t',
          },
          data: imageData.split(',')[1],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
  
        setImage(imageData);
        setFinalIngredients(
          response.data.predictions.map((prediction) => ({
            name: prediction.class.replace(/_/g, ' '),
            confidence: prediction.confidence,
          }))
        );
  
        // Image display logic
        const uploadedImage = new Image();
        uploadedImage.onload = () => {
          // Calculate the aspect ratio
          const aspectRatio = uploadedImage.width / uploadedImage.height;
  
          // Calculate the new width based on the desired height (500px)
          const newWidth = 500 * aspectRatio;
  
          // Set the uploaded image to div-24 with the new size
          document.querySelector('.div-24').style.backgroundImage = `url(${reader.result})`;
          document.querySelector('.div-24').style.width = `${newWidth}px`;
          document.querySelector('.div-24').style.height = `500px`;
        };
        uploadedImage.src = reader.result;
  
      } catch (error) {
        console.log(error.message);
      }
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    // Clear the uploaded image
    setImage(null);
    // Reset the file input
    document.getElementById('fileInput').value = '';
    // Remove the background image from div-24
    document.querySelector('.div-24').style.backgroundImage = '';
    // Clear the final ingredients list
    setFinalIngredients([]);
  };

  const handleDeleteIngredient = (index) => {
    // Remove ingredient from the list
    const updatedIngredients = [...finalIngredients];
    updatedIngredients.splice(index, 1);
    setFinalIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    // Add new ingredient to the list
    if (newIngredientName) {
      setFinalIngredients([
        ...finalIngredients,
        {
          name: newIngredientName,
          confidence: 1.0, // You can set confidence here
        },
      ]);
      setNewIngredientName('');
    }
  };

  const [formattedIngredientsList, setFormattedIngredientsList] = useState('');

  const handleSubmitFinalIngredients = () => {
    const uniqueIngredients = Array.from(new Set(finalIngredients.map((ingredient) => ingredient.name)));
    const formattedIngredients = uniqueIngredients.join(', ');
    setFormattedIngredientsList(formattedIngredients);
    localStorage.setItem('formattedIngredients', formattedIngredients);
    console.log('Final ingredients successfully submitted to local storage:', formattedIngredients);
  };

  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9addeacb63b0071ba1e9a3cab5e21ba122fb1ae3e6720e0811c299cdc8f06edb?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9addeacb63b0071ba1e9a3cab5e21ba122fb1ae3e6720e0811c299cdc8f06edb?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9addeacb63b0071ba1e9a3cab5e21ba122fb1ae3e6720e0811c299cdc8f06edb?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9addeacb63b0071ba1e9a3cab5e21ba122fb1ae3e6720e0811c299cdc8f06edb?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9addeacb63b0071ba1e9a3cab5e21ba122fb1ae3e6720e0811c299cdc8f06edb?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9addeacb63b0071ba1e9a3cab5e21ba122fb1ae3e6720e0811c299cdc8f06edb?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9addeacb63b0071ba1e9a3cab5e21ba122fb1ae3e6720e0811c299cdc8f06edb?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9addeacb63b0071ba1e9a3cab5e21ba122fb1ae3e6720e0811c299cdc8f06edb?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&"
              className="img"
            />
            <div className="div-4">Snap a picture of your fridge</div>
          </div>
        </div>
        <div className="div-5">
          <div className="div-6" onClick={handleRemoveImage}>Remove Image</div>
          <div className="div-7" onClick={handleImageUpload}>Upload Image</div>
          <div className="div-8" onClick={handleSubmitFinalIngredients}>Submit Final Ingredients</div>
        </div>
        <div className="div-9">
          <div className="div-10">
            <div className="div-11">Final Ingredients:</div>
            {finalIngredients.map((ingredient, index) => (
  <div className="div-12" key={index}>
    <div className="div-13" onClick={() => handleDeleteIngredient(index)}>Delete</div>
    <div className="div-15">{ingredient.name} - {`${(ingredient.confidence * 100).toFixed(1)}%`}</div>
  </div>
))}
          </div>
          <div className="div-22">
            <div className="div-23">Uploaded Image:</div>
            <div className="div-24" />
          </div>
          <div className="div-25">
            <input
              type="text"
              placeholder="Enter ingredient name"
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
            />
            <div className="div-26" onClick={handleAddIngredient}>Add Ingredient</div>
          </div>
        </div>
      </div>
      {/* File input */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <style jsx>{`
        .div {
          padding-bottom: 31px;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (max-width: 991px) {
          .div {
            flex-wrap: wrap;
          }
        }
        .div-2 {
          background-color: #f0ece1;
          align-self: stretch;
          display: flex;
          width: 100%;
          align-items: center;
          gap: 0px;
          font-size: 54px;
          color: #3e2723;
          font-weight: 700;
          line-height: 107%;
          justify-content: center;
          padding: 74px 60px;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
            font-size: 40px;
            padding: 0 20px;
          }
        }
        .div-3 {
          display: flex;
          width: 730px;
          max-width: 100%;
          flex-direction: column;
          gap: 20px;
        }
        @media (max-width: 991px) {
          .div-3 {
            flex-wrap: wrap;
            font-size: 40px;
          }
        }
        .img {
          aspect-ratio: 1.15;
          object-fit: auto;
          object-position: center;
          width: 100%;
          align-self: center;
          gap: 0px;
          max-width: 83px;
        }
        .div-4 {
          font-family: Raleway, sans-serif;
          margin-top: 34px;
          gap: 0px;
        }
        @media (max-width: 991px) {
          .div-4 {
            max-width: 100%;
            flex-wrap: wrap;
            font-size: 40px;
          }
        }
        .div-5 {
          display: flex;
          gap: 18px;
          font-size: 20px;
          color: #fff;
          font-weight: 600;
          text-align: center;
          line-height: 140%;
          padding: 0 20px;
        }
        @media (max-width: 991px) {
          .div-5 {
            flex-wrap: wrap;
          }
        }
        .div-6 {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 12px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          padding: 15px 16px;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .div-6 {
            padding: 0 20px;
          }
        }
        .div-7 {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 12px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          padding: 15px 16px;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .div-7 {
            padding: 0 20px;
          }
        }
        .div-8 {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 12px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          padding: 15px 8px;
          cursor: pointer;
        }
        .div-9 {
          display: flex;
  position: relative; /* Add this line */
  width: 100%;
  max-width: 1430px;
  gap: 20px;
  justify-content: space-between;
  padding: 0 20px;
  align-items: flex-start; /* Add this line */
        }
        @media (max-width: 991px) {
          .div-9 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .div-10 {
          align-self: start;
          display: flex;
          margin-top: 9px;
          flex-direction: column;
          gap: 15px;
          font-weight: 500;
        }
        .div-11 {
          color: #3e2723;
          gap: 0px;
          font: 32px/181% Raleway, sans-serif;
        }
        .div-12 {
          display: flex;
          margin-top: 21px;
          gap: 5px;
        }
        .div-13 {
          justify-content: center;
          border-radius: 5px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          display: flex;
          flex-direction: column;
          gap: 0px;
          font-size: 15px;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          line-height: 28px;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .div-13 {
            white-space: initial;
          }
        }
        .div-14 {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 5px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          padding: 2px 16px;
        }
        @media (max-width: 991px) {
          .div-14 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-15 {
          color: #3e2723;
          gap: 0px;
          flex-grow: 1;
          flex-basis: auto;
          margin: auto 0;
          font: 20px/290% Raleway, sans-serif;
        }
        .div-16 {
          display: flex;
          margin-top: 15px;
          gap: 5px;
        }
        .div-17 {
          justify-content: center;
          border-radius: 5px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          padding: 3px 16px;
          font: 15px/28px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .div-17 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-18 {
          color: #3e2723;
          gap: 0px;
          flex-grow: 1;
          flex-basis: auto;
          margin: auto 0;
          font: 20px/290% Raleway, sans-serif;
        }
        .div-19 {
          display: flex;
          margin-top: 15px;
          gap: 5px;
        }
        .div-20 {
          justify-content: center;
          border-radius: 5px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          padding: 2px 16px;
          font: 15px/28px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .div-20 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-21 {
          color: #3e2723;
          gap: 0px;
          flex-grow: 1;
          flex-basis: auto;
          margin: auto 0;
          font: 20px/290% Raleway, sans-serif;
        }
        .div-22 {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 32px;
          color: #3e2723;
          font-weight: 500;
          line-height: 181%;
        }
        @media (max-width: 991px) {
          .div-22 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .div-23 {
          font-family: Raleway, sans-serif;
          align-self: center;
          gap: 0px;
        }
        .div-24 {
          max-width: 750px; /* Maximum width */
          height: ${image ? 'auto' : '500px'}; /* Adjust height based on whether image is present */
          border-radius: 29px; /* Border radius */
          border-color: rgba(240, 236, 225, 1);
          border-style: solid;
          border-width: 5px;
          background-color: #fff;
          background-size: contain; /* Scale the image to fit within the container */
          background-repeat: no-repeat; /* Prevent image from repeating */
          background-position: center; /* Center the background image */
          position: relative; /* Position for overlay */
        }

        .overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
        }
        .div-25 {
          display: flex;
          gap: 0px;
          text-align: center;
          margin: 250px 0;
        }
        .div-26 {
          justify-content: center;
  border-radius: 5px 5px 5px 5px;
  border-color: rgba(217, 114, 85, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #d97255;
  color: #fff;
  padding: 13px 16px;
  font: 500 20px/140% Inter, -apple-system, Roboto, Helvetica, sans-serif;
  position: sticky; /* Add this line */
  bottom: 0; /* Add this line */
  z-index: 1; /* Add this line */
  cursor: pointer;
        }
        .div-27 {
          color: rgba(62, 39, 35, 0.75);
          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          gap: 0px;
          flex-grow: 1;
          flex-basis: auto;
          margin: auto 0;
          font: 300 13px/28px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
      `}</style>
    </>
  );
}
