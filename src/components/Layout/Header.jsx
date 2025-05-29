import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Navbar>
        <Container>
            <Navbar.Brand as={Link} to='/'>Shoppy</Navbar.Brand>
            <Navbar.Toggle aria-control='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto' >
            <Nav.Link as={Link} to='/orders'>Orders</Nav.Link>
            
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header