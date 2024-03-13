import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

export default function Register() {
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} md='6'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type='text' placeholder="Frist name" />
                </Form.Group>
                <Form.Group as={Col} md='6'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type='text' placeholder="Last name" />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Select aria-label="Default select example">
                <option>Choose your diet</option>
                <option value="1">Vegan</option>
                <option value="2">Vegetarian</option>
            </Form.Select>
            <Link to='/profile'>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Link>
        </Form>
    );
}

