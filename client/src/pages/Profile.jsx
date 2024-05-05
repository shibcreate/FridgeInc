import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Profile({ isLoggedIn, setIsLoggedIn, updateProfileColor }) {
  const location = useLocation();
  const { email, name } = location.state || {};
  const [dietPreference, setDietPreference] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', {
          withCredentials: true,
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

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:3001/save-diet-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, dietPreference }),
      });

      if (response.ok) {
        console.log('Diet preference saved successfully');
        // Optionally, you can redirect the user to another page after saving
      } else {
        console.error('Failed to save diet preference');
      }
    } catch (error) {
      console.error('Error saving diet preference:', error);
    }
  };

  const handleDisplayChanges = () => {
    try {
      // Save profile picture color and bio to local storage
      localStorage.setItem('userColor', profilePicture);
      localStorage.setItem('userBio', bio);
  
      console.log('Profile Picture Color:', profilePicture);
      console.log('Display preference saved successfully');
  
      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving display preference:', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Card style={{ width: '35rem', margin: '40px' }}>
        <Card.Header style={{ backgroundColor: '#F0ECE1' }}>User Info</Card.Header>
        <Card.Body>
          <Card.Text>Email: {email}</Card.Text>
          <Card.Text>Select Your Diet Preference</Card.Text>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setDietPreference(e.target.value)}
          >
            <option>No Preference</option>
            <option value="1">No-Eggs</option>
            <option value="2">Vegetarian</option>
            <option value="3">Gluten-Free</option>
            <option value="4">Low-Fat</option>
            <option value="5">High-Protein</option>
            <option value="6">Vegan</option>
            <option value="7">Nut-Free</option>
            <option value="8">Low-Sodium</option>
          </Form.Select>
          {/* Other profile information */}
        </Card.Body>
        <button className="btn btn-primary" style={{ backgroundColor: '#D97255' }} onClick={handleSaveChanges}>
          Save Changes
        </button>
      </Card>

      <Card style={{ width: '35rem', margin: '40px' }}>
        <Card.Header style={{ backgroundColor: '#F0ECE1' }}>Public Display</Card.Header>
        <br></br>
        <Card.Body>
          <Form.Group controlId="profilePicture">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Select
              aria-label="Select color"
              onChange={(e) => setProfilePicture(e.target.value)}
            >
              <option>Select Your Color</option>
              <option value="Tomato">red</option>
              <option value="Orange">yellow</option>
              <option value="YellowGreen">green</option>
              <option value="CornflowerBlue">blue</option>
              <option value="Orchid">purple</option>
            </Form.Select>
          </Form.Group>
          <br></br>
          <Form.Group controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Start typing here..."
            />
          </Form.Group>
          <Card.Text><i>Changes apply after refreshing</i></Card.Text>
        </Card.Body>
        <button className="btn btn-primary" style={{ backgroundColor: '#D97255' }} onClick={handleDisplayChanges}>
          Save Changes
        </button>
        {/* Using a button instead of Link for form submission */}
      </Card>
    </div>
  );
}
