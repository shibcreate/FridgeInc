import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function Homepage({ isLoggedIn, setIsLoggedIn }) {
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

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Image style={{ width: '90%', marginTop: '30px' }} src='./src/resources/banner.png' /> 
        </Col>
        <Col sm={4}>
          <h2>Welcome to FrideInc</h2>
          <p>Find recipes within a snap!</p>
          <p>Need to find a quick recipe or publish your own? FridgeInc offers it all!</p> 
          {!isLoggedIn && (
            <Link to='/register'>
              <Button style={{ margin: '10px' }} variant="outline-dark">Sign Up</Button>
            </Link>
          )}
          <Link to='/recipes'>
            <Button style={{ margin: '10px' }} variant="outline-dark">Explore Recipes</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;