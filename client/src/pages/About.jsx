import React from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function About() {
    return (
        <div>
            <Container className="justify-content-evenly">
                <Row className="justify-content-md-center">
                    <Col style={{padding: '50px 20px'}}>
                    <Image style={{width: '450px'}} src="src/resources/fridgdeSquare.png" thumbnail />
                    </Col>
                    <Col style={{padding: '130px 10px 100px'}}>
                        <Card style={{padding: '50px'}}>
                        <p>With the unforseen cost of living ahead of us, we see the need to find a solution that helps our client budget; and it first comes with the most priotitized component in our life - health
                        We help everyone uses our app to get a healthy recipe with the ingredients that you already have at home!
                        </p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

