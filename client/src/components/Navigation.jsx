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

          <Nav.Link href="/custom-list">Custom Recipes</Nav.Link>

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
            </Nav> 
            {isLoggedIn && (
            <>
              <Link to='/custom-list/posts' className="ml-auto">
                <Button style={{margin: '15px'}} variant="outline-primary">Posts</Button>
              </Link>
              <Logout handleLogout={handleLogout} />
            </>
          )}
        {!isLoggedIn && (
          <Link to='/login' className="ml-auto">
            <Button variant="outline-success">Log In</Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
}