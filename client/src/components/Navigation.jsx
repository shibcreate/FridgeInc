import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export default function Navigation() {

  return (
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid>
          <Nav className="me-auto">
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
          </Nav>
          <Link to='/login'>
          <Button variant="outline-success">Log In</Button>
          </Link>
        </Container>
      </Navbar>
  );
}