import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function Account() {
  const location = useLocation();
  const { email, name } = location.state || {};
  const [dietPreference, setDietPreference] = useState('');

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

  return (
    <Card style={{ width: '35rem', margin: '40px' }}>
      <Card.Header>User Info</Card.Header>
      <Card.Body>
        <Card.Text>Email: {email}</Card.Text>
        <Card.Text>Select Your Diet Preference</Card.Text>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setDietPreference(e.target.value)}
        >
          <option>Select Your Diet</option>
          <option value="1">No-Eggs</option>
          <option value="2">Vegetarian</option>
          <option value="3">Gluten-Free</option>
        </Form.Select>
        {/* Other profile information */}
      </Card.Body>
      <button className="btn btn-primary" onClick={handleSaveChanges}>
        Save Changes
      </button>
      {/* Using a button instead of Link for form submission */}
    </Card>
  );
}