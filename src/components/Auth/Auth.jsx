import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const Auth = () => {
  const [loginState, setLoginState] = useState(true);

  const loginToggleHandler = () => {
    setLoginState((prev) => !prev);
  };
  const submitHandler=(e)=>{
    e.preventDefault();

  }

  return (
    
    <Container>
      <h4>{loginState ? "Login" : "Sign Up"}</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Your Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email " required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Password</Form.Label>
          <Form.Control type="email" placeholder="Enter your email " required />
        </Form.Group>
        {!loginState && (
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your email "
              required
            />
          </Form.Group>
        )}
        
        <Button>{loginState ? "Login" : "Create Account"}</Button>
        <Button variant="primary" onClick={loginToggleHandler}>
          {loginState ? "Create new account" : "Login with existing account"}
        </Button>
      </Form>
      </Container>
    
  );
};

export default Auth;
