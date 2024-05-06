import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
    return (
        <>
            <div className="fixed-bottom">
                <Container fluid className="footer-container">
                    <Row>
                        <Col>
                            <a href='/about' className="footer-link">About Us</a>
                        </Col>
                        <Col>
                            <a href='/term' className="footer-link">Term Of Services</a>
                        </Col>
                        <Col>
                            <a href='/contact' className="footer-link">Contact Us</a>
                        </Col>
                        <Col>
                            <a href='/privacy' className="footer-link">Privacy</a>
                        </Col>
                    </Row>
                </Container>
            </div>
            <style jsx>{`
          .footer-container {
            background-color: white;
        }
        
        .footer-link {
            color: #343a40; /* Dark gray text color */
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            transition: color 0.3s ease; /* Smooth color transition on hover */
        }
        
        .footer-link:hover {
            text-decoration: underline; /* Underline on hover */
        }
        
          `}</style>
        </>
    );
}
