
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart, toggleCart } from "../../store/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const DATABASE_URL =import.meta.env.VITE_DATABASE_URL;

  const {
    data: product,
    loading,
    error,
  } = useFetch(`${DATABASE_URL}/products/${id}.json`
  );

  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
    transformOrigin: "center center",
    transition: "transform 0.3s ease",
  });

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;

    setZoomStyle({
      transform: "scale(1.6)",
      transformOrigin: `${x}% ${y}%`,
      transition: "transform 0.1s ease",
    });
  };

  const resetZoom = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
      transition: "transform 0.3s ease",
    });
  };


  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-danger">Error: {error.message}</p>
    );
  if (!product)
    return <p className="text-center mt-4 text-warning">Product not found.</p>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <div
            style={{
              backgroundColor: "#1f1f1f",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              overflow:'hidden',
            }} 
             onMouseMove={handleMouseMove}
            onMouseLeave={resetZoom}
          >
            <img
              loading="lazy"
              src={
                product.imageUrl?.trim() ||
                "https://via.placeholder.com/300x300?text=No+Image"
              }
              style={{
                maxHeight: "400px",
                objectFit: "contain",
                ...zoomStyle,
              }}
              alt={product.title}
              className="img-fluid"
            />
          </div>
        </Col>
        <Col md={6}>
          <Card
            style={{
              backgroundColor: "#121212",
              color: "#ffffff",
              border: "1px solid #2a2a2a",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Card.Body>
              <Card.Title
                style={{
                  color: "#d1d1d1",
                  fontWeight: "700",
                  fontSize: "2rem",
                  marginBottom: "12px",
                }}
              >
                {product.title}
              </Card.Title>
              <p
                style={{
                  color: "#bcbcbc",
                  marginBottom: "8px",
                  fontSize: "0.95rem",
                }}
              >
                {product.category}
              </p>
              <h4 className="text-warning mb-3">₹{product.price}</h4>
              <p style={{ color: "#cccccc", fontSize: "1rem" }}>
                {product.description}
              </p>

              <Button
                variant="secondary"
                className="me-2"
                onClick={() => dispatch(addToCart(product))}
                style={{
                  background: "linear-gradient(to right, #4B4B4B, #9E9E9E)",
                  border: "none",
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(addToCart(product));
                  dispatch(toggleCart());
                }}
                style={{
                  background: "linear-gradient(to right, #007bff, #0056b3)",
                  border: "none",
                }}
              >
                Buy Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
