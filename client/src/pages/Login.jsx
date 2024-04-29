import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login({isLoggedIn, setIsLoggedIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      }, {
        withCredentials: true,
      });
      if (response.data === 'Logged in') {
        navigate('/profile', { state: { email, name: response.data.name } });
      } else 
        setErrorMessage('Incorrect email or password. Please try again.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if(!isLoggedIn) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          placeholder="Enter email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <div className="password-input">
          <Form.Control
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\!@*.]).{8,20}"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            style={{ marginRight: "5px" }}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
      </Form.Group>
     
      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>
     
      <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
        Sign Up
      </Link>
    </Form>
  );
} else {
  return <h5>You are already logged in. If you wish to create a new account, log out first</h5>
}
  }