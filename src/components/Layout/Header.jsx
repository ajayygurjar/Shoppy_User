import {
  Navbar,
  Nav,
  Container,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Navbar bg="info" expand='lg' className="text-white">
        <Container>
            <Navbar.Brand as={Link} to='/' className="text-white">Shoppy</Navbar.Brand>
            <Navbar.Toggle aria-control='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
            
            <Form className="d-flex me-2" style={{ maxWidth: "350px" }}>
              <InputGroup className="w-100">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  
                />
                <Button variant="outline-light" type="submit">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>

            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/about" className="text-white">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/orders" className="text-white">
                Orders
              </Nav.Link>

              <Button variant="info"  className="text-white ms-2">
                <i className="bi bi-cart"></i>
              </Button>

                <>
                  <Button variant="info"  className="text-white ms-2">
                    <i className="bi bi-person"></i>
                  </Button>
                  <Button  variant="danger" className="ms-2">
                    Logout
                  </Button>
                </>
               
                <Button as={Link} to='auth' variant="outline-light" className="ms-2">
                  Login
                </Button>
              
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header