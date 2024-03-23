import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function Account() {
    return (
        <Card style={{ width: '35rem', margin: '40px' }}>
            <Card.Header>User Info</Card.Header>
            <Card.Body>
                <Card.Text>
                    Name
                </Card.Text>
                <Card.Text className="text-muted">
                    Name
                </Card.Text>
                <Card.Text>
                    Email
                </Card.Text>
                <Card.Text className="text-muted">
                    example@mail.com
                </Card.Text>
                <Card.Text>
                    Select Your Diet Preference
                </Card.Text>
                <Form.Select aria-label="Default select example">
                    <option>Select Your Diet</option>
                    <option value="1">No-Eggs</option>
                    <option value="2">Vegeterian</option>
                    <option value="3">Gluten-Free</option>
                </Form.Select>
            </Card.Body>
            <Link to="/profile" className="btn btn-primary">
                Save Changes
            </Link>
        </Card>
    );
}