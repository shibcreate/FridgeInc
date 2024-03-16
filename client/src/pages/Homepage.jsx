import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

export default function Homepage() {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Image style={{ width: '90%' }} src='./src/resources/banner.png' />
        </Col>
        <Col sm={4}>
          <h2>Welcome to FrideInc</h2>
          <p>Find recipes within a snap!</p>
          <p>Either finding a quick recipes or sharing your own, FridgeInc offers it all!</p> 
          <Link to='/register'>
            <Button style={{margin:'10px'}} variant="outline-dark">Join Community</Button>
          </Link>
          <Link to='/recipes'>
            <Button style={{margin:'10px'}} variant="outline-dark">Explore Recipes</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}