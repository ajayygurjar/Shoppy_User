// src/pages/ProductDetailPage.jsx
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const ProductDetailPage = () => {
  const { id } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useFetch(
    `https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`
  );

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-danger">
        Error: {error.message}
      </p>
    );
  if (!product)
    return <p className="text-center mt-4 text-warning">Product not found.</p>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <img
            src={
              product.imageUrl?.trim() ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }
            alt={product.title}
            className="img-fluid"
          />
        </Col>
        <Col md={6}>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <p className="text-muted">{product.category}</p>
            <h4>₹{product.price}</h4>
            <p>{product.description}</p>

            <Button
              variant="secondary"
              className="me-2"
              onClick={() => alert("Added to cart!")}
            >
              Add to Cart
            </Button>
            <Button variant="primary" onClick={() => alert("Buy product!")}>
              Buy Now
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
