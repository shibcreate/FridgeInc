import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function RecipesList() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/logo192.png" />
      <Card.Body>
        <Card.Title>Recipe Name</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Read more</Button>
      </Card.Body>
    </Card>
  );
}

export default RecipesList;