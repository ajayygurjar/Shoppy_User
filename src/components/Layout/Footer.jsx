import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-info text-light py-4  mt-4">
        <Container>
            <Row>
                <Col md={4}>
                <h5>Shoppy</h5>
                <p>&copy;{new Date().getFullYear()}Shoppy. All rights reserved. </p>
                </Col>
                <Col md={4}>
            <h5>Contact</h5>
            <p>Email: support@Shoppy.com</p>
            <p>Phone: +123-456-7890</p>
          </Col>
          <Col md={4}>
            <h5>Pages</h5>
            <ul className="list-unstyled">
              <li><a href="/#" className="text-light text-decoration-none">About</a></li>
              <li><a href="/#" className="text-light text-decoration-none">Category</a></li>
              <li><a href="/#" className="text-light text-decoration-none">Orders</a></li>
            </ul>
          </Col>


            </Row>
        </Container>
    </footer>
  )
}

export default Footer