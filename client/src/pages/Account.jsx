import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Account() {
  const location = useLocation();
  const { email, name } = location.state || {};
  const [dietPreference, setDietPreference] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');

  const handleDietPreferenceChange = (e) => {
    setDietPreference(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('dietPreference', dietPreference);
      formData.append('profilePicture', profilePicture);
      formData.append('bio', bio);

      const response = await fetch('http://localhost:3001/save-account-details', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Account details saved successfully');
        // Optionally, you can redirect the user to another page after saving
      } else {
        console.error('Failed to save account details');
      }
    } catch (error) {
      console.error('Error saving account details:', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-between">
      <Card style={{ width: '35rem', margin: '20px' }}>
          <Card.Header>Public Display</Card.Header>
          <Card.Body>
            <Form.Group controlId="profilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleProfilePictureChange} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={bio}
                onChange={handleBioChange}
                placeholder="Start typing here..."
              />
            </Form.Group>
          </Card.Body>
        </Card>
        
        <Card style={{ width: '35rem', margin: '20px' }}>
          <Card.Header>Preferences</Card.Header>
          <Card.Body>
            <Card.Text>Email: {email}</Card.Text>
            <Form.Group controlId="dietPreference">
              <Form.Label>Select Your Diet Preference</Form.Label>
              <Form.Select
                aria-label="Select your diet preference"
                onChange={handleDietPreferenceChange}
              >
                <option>Select Your Diet</option>
                <option value="No-Eggs">No-Eggs</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>
      </div>
      <Button className="btn btn-primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </div>
  );
}
