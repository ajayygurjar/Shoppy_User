import { useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const DATABASE_URL =import.meta.env.VITE_DATABASE_URL;

const api =`${DATABASE_URL}/products.json`;

const getRandomItems = (arr, n) => {
  const result = [];
  const taken = new Set();

  while (result.length < n && result.length < arr.length) {
    const index = Math.floor(Math.random() * arr.length);
    if (!taken.has(index)) {
      taken.add(index);
      result.push(arr[index]);
    }
  }

  return result;
};

const HeroCarousel = () => {
  const { data: products, loading, error } = useFetch(api);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      // pick 5 random products
      const randomProducts = getRandomItems(products, 5);
      setFeaturedProducts(randomProducts);
    }
  }, [products]);

  if (loading)
    return <p className="text-light">Loading featured products...</p>;
  if (error)
    return (
      <p className="text-danger">Error loading products: {error.message}</p>
    );

  if (featuredProducts.length === 0)
    return <p className="text-muted">No featured products available.</p>;

  return (
    <Carousel fade interval={4000} controls={false} indicators pause={false}>
      {featuredProducts.map(({ id, title, description, imageUrl }) => (
        <Carousel.Item key={id}>
          <div
            style={{
              position: "relative",
              backgroundImage:
                "linear-gradient(to right, rgba(18, 18, 18, 0.6), rgba(18, 18, 18, 0.2))",
                
              backgroundColor: "#2a2a2a",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              marginTop:"80px",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                transition: "transform 0.6s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>

          <Carousel.Caption
            style={{
              backgroundColor: "rgba(18, 18, 18, 0.75)",
              borderRadius: "12px",
              padding: "20px",
              color: "#f1f1f1",
              
            }}
          >
            <h3 style={{ color: "#fbbf24" }}>{title}</h3>
            <p>{description || "Great product for your needs"}</p>
            <Button
              as={Link}
              to={`/product/${id}`}
              style={{
                borderColor: "#fbbf24",
                color: "#fbbf24",
              }}
              variant="outline-light"
            >
              View Product
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
