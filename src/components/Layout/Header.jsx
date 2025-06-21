import {
  Navbar,
  Nav,
  Container,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";

import { NavLink,Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { authActions } from "../../store/authSlice";
import Auth from "../Auth/Auth";
import Profile from "../Auth/Profile";
import { toggleCart } from "../../store/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoginModalOpen = useSelector((state) => state.auth.isLoginModalOpen);
  const isProfileModalOpen = useSelector(
    (state) => state.auth.isProfileModalOpen
  );

  const openProfileModalHandler = () => {
    dispatch(authActions.openProfileModal());
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const openLoginModalHandler = () => {
    dispatch(authActions.openLoginModal());
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <Navbar 
      style={{
          background: 'linear-gradient(135deg, #121212, #1f1f1f)',
          borderBottom: '1px solid #2a2a2a',
        }}
        expand="lg"
        variant="dark"
      className="text-white">
        <Container>
          <Navbar.Brand
           as={Link} 
           to="/" 
           style={{
              color: '#ffffff',
              fontWeight: 'bold',
              textShadow: '0 0 6px #00d4ff',
            }}
           >
            Shoppy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form
              className="d-flex me-2"
              style={{ maxWidth: "350px" }}
              onSubmit={submitSearchHandler}
            >
              <InputGroup className="w-100">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-light text-dark"
                  style={{
                    backgroundColor: "#1f1f1f",
                    borderColor: "#444",
                    color: "#fff",
                  }}
                />
                <Button 
                className="ms-2"
                 style={{
                    background: 'linear-gradient(to right, #4B4B4B, #9E9E9E)',
                    border: 'none',
                    color: 'white',
                  }}
                 type="submit"
                 >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>

            <Nav className="ms-auto align-items-center">
              <Nav.Link 
              as={NavLink}
               to="/about"
                 className={({ isActive }) => (isActive ? "fw-bold" : "")}
                  style={({ isActive }) => ({
                    color: isActive ? "#fbbf24" : "#ffffff",
                  })} 
              
              >
                About
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link 
                as={NavLink}
                to="/orders"
                  className={({ isActive }) => (isActive ? "fw-bold" : "")}
                  style={({ isActive }) => ({
                    color: isActive ? "#fbbf24" : "#ffffff",
                  })}
                 >
                  Orders
                </Nav.Link>
              )}

              <Button
                className="text-white ms-2 p-0"
                onClick={() => dispatch(toggleCart())}
                variant="link"
                
              >
                <i className="bi bi-cart" style={{fontSize:'1.3rem'}}></i>
              </Button>

              {isLoggedIn ? (
                <>
                  <Button
                    onClick={openProfileModalHandler}
                     variant="link"
                    className="text-white ms-3 p-0"
                  >
                    <i className="bi bi-person" style={{fontSize:'1.3rem'}}></i>
                  </Button>
                  <Button
                    onClick={logoutHandler}
                    variant="outline-light"
                    className="ms-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={openLoginModalHandler}
                  className="ms-3"
                  variant="outline-light"
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Auth show={isLoginModalOpen} />

      {isLoggedIn && (
        <Profile
          show={isProfileModalOpen}
          onHide={() => dispatch(authActions.closeProfileModal())}
        />
      )}
    </>
  );
};

export default Header;
