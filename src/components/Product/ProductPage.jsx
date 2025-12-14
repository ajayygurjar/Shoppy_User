import "./ProductPage.css";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { toggleCart, addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

  const DATABASE_URL =import.meta.env.VITE_DATABASE_URL;

  const api = `${DATABASE_URL}/products.json`;
const ProductPage = () => {
  const { data, loading, error } = useFetch(api);
  const dispatch = useDispatch();

  if (loading) return <p className="text-center text-light mt-5">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-5 text-danger">Error: {error.message}</p>
    );
  if (!data || data.length === 0)
    return <p className="text-center mt-5 text-warning">No products found.</p>;

  return (
    <Container className="mt-5">
      <Row>
        {data.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card
             className="product-card"
              style={{
                backgroundColor: "#1f1f1f",
                color: "#f1f1f1",
                border: "1px solid #333",
              }}
            >
              <Link to={`/product/${product.id}`}>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#2a2a2a",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                  }}
                >
                  <Card.Img
                  className="product-card-img"
                    loading="lazy"
                    variant="top"
                    src={
                      product.imageUrl?.trim() ||
                      "https://via.placeholder.com/150"
                    }
                      
                    style={{
                      maxHeight: "100%",
                      width: "auto",
                      objectFit: "contain",
                      padding: "10px",
                    }}
                  />
                </div>
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none", color: "#f1f1f1" }}
                  >
                    {product.title || "No Title"}
                  </Link>
                </Card.Title>
                <h5>₹{product.price || "N/A"}</h5>
                <Button
                className="me-2 product-button add-to-cart"
                  style={{
                    background: "linear-gradient(to right, #6b7280, #9ca3af)",
                    border: "none",
                    color: "#ffffff",
                    
                  }}
                  
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
                <Link to={`/product/${product.id}`}>
                  <Button
                  className="me-2 product-button buy-now"
                    style={{
                      background: "linear-gradient(to right, #007bff, #0056b3)",
                      border: "none",
                      
                    }}
                    onClick={() => {
                      dispatch(addToCart(product)); // Add product to cart
                      dispatch(toggleCart()); // Open the cart drawer
                    }}
                  >
                    Buy Now
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
