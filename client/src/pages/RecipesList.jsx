import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import react from 'react';
import {Link} from 'react-router-dom'

function RecipesList() {
  return (
    <div>
    <h1> Lastest Recipes </h1>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/logo192.png" />
      <Card.Body>
        <Card.Title>Recipe Name</Card.Title>
        <Link to='/recipeDetail'>
        <Button variant="outline-dark">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
    </div>
  );
}

export default RecipesList;