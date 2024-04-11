import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
      }, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        navigate('/upload');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group md="6">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\!@*.]).{8,20}"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Text id="passwordHelpBlock" muted>
        Your password must be at least 8-20 characters long, contains at least one uppercase letter, 
        one lowercase letter, one number, and one special characters (!, @, *, .)
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>

      <Link
        to="/login"
        className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
      >
        Login
      </Link>
    </Form>
  );
}