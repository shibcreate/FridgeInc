import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Logout from '../pages/Logout';

export default function Navigation({ isLoggedIn, handleLogout }) {

  return (
    <Navbar bg="light" expand="md" data-bs-theme="light">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            alt="FridgeInc logo"
            src="/src/resources/logo-demo.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
          FridgeInc
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>

          <Nav.Link href="/recipes">Recipes</Nav.Link>

          <Nav.Link href="/upload">Upload
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: localStorage.getItem('userColor'),
                display: 'inline-block',
                marginLeft: '5px',
              }}
            ></div>
            </Nav.Link>      
            {isLoggedIn && (
            <>
              <Link to='/share-recipe' className="ml-auto">
                <Button variant="outline-primary">Share</Button>
              </Link>
              <Logout handleLogout={handleLogout} />
            </>
          )}
        </Nav>
        {!isLoggedIn && (
          <Link to='/login' className="ml-auto">
            <Button variant="outline-success">Log In</Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
}