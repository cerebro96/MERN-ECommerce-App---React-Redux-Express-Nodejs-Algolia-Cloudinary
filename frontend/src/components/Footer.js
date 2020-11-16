import React from 'react'
import { Row,Col,Container } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; Gamu
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
