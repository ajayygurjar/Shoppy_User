import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../store/cartSlice";
import { Offcanvas, Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentAddress } = useSelector((state) => state.address);
  const { isCartOpen, cartItems, totalAmount } = useSelector(
    (state) => state.cart
  );
  const auth = useSelector((state) => state.auth);

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const placeOrder = async () => {
    if (!auth.token) {
      dispatch(toggleCart());
      dispatch({ type: 'auth/openLoginModal' });
      return;
    }

    if (!currentAddress) {
      setOrderError("Please add your delivery address in your profile before placing an order.");
      return;
    }

    if (cartItems.length === 0) {
      setOrderError("Your cart is empty!");
      return;
    }

    setIsPlacingOrder(true);
    setOrderError(null);

    const orderData = {
      user: auth.email || "guest",
      items: cartItems,
      totalAmount,
      paymentMethod,
      orderDate: new Date().toISOString(),
      status: "placed",
      deliveryAddress: currentAddress,
    };

    try {
      await axios.post(`${DATABASE_URL}/orders.json`, orderData);
      
      dispatch(clearCart());
      localStorage.removeItem("guest_cart");
      setShowPayment(false);
      
      // Show success and redirect to orders
      alert("Order placed successfully! 🎉");
      dispatch(toggleCart());
      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error);
      setOrderError("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleCheckout = () => {
    if (!auth.token) {
      dispatch(toggleCart());
      dispatch({ type: 'auth/openLoginModal' });
      return;
    }
    setShowPayment(true);
  };

  const EmptyCart = () => (
    <div className="text-center py-5">
      <i 
        className="bi bi-cart-x text-muted" 
        style={{ fontSize: "4rem" }}
      ></i>
      <h5 className="mt-3 text-muted">Your cart is empty</h5>
      <p className="text-muted">Add some products to get started!</p>
      <Button
        variant="primary"
        onClick={() => {
          dispatch(toggleCart());
          navigate("/product");
        }}
      >
        Start Shopping
      </Button>
    </div>
  );

  return (
    <Offcanvas
      show={isCartOpen}
      onHide={() => {
        dispatch(toggleCart());
        setShowPayment(false);
        setOrderError(null);
      }}
      placement="end"
      style={{ width: "400px" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Your Cart {cartItems.length > 0 && `(${cartItems.length})`}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.title}`}
                  className="mb-3 border-bottom pb-3"
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-start" style={{ flex: 1 }}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          marginRight: "12px",
                          borderRadius: "4px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <strong className="d-block mb-1" style={{ fontSize: "0.95rem" }}>
                          {item.title}
                        </strong>
                        <div className="text-success fw-bold mb-2">
                          ₹{Number(item.price).toFixed(2)}
                        </div>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => dispatch(decreaseQty(item.id))}
                            style={{ padding: "2px 8px" }}
                          >
                            -
                          </Button>
                          <span className="mx-2 fw-bold">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => dispatch(increaseQty(item.id))}
                            style={{ padding: "2px 8px" }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      title="Remove item"
                    >
                      <i className="bi bi-trash" style={{ fontSize: "1.2rem" }}></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-top">
              {orderError && (
                <Alert variant="danger" dismissible onClose={() => setOrderError(null)}>
                  {orderError}
                </Alert>
              )}

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Total:</h5>
                <h4 className="mb-0 text-success">
                  ₹{Number(totalAmount || 0).toFixed(2)}
                </h4>
              </div>

              {!showPayment ? (
                <Button
                  className="w-100"
                  variant="primary"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <>
                  <div className="mb-3 p-3 bg-light rounded">
                    <strong className="d-block mb-2">Delivery Address:</strong>
                    <div className="text-muted">
                      {currentAddress || "No address available"}
                    </div>
                    {!currentAddress && (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 mt-2"
                        onClick={() => {
                          dispatch(toggleCart());
                          dispatch({ type: 'auth/openProfileModal' });
                        }}
                      >
                        Add address in profile
                      </Button>
                    )}
                  </div>

                  <div className="mb-3">
                    <strong className="d-block mb-2">Payment Method:</strong>
                    <Form>
                      <Form.Check
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        label="Cash on Delivery (COD)"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mb-2"
                      />
                      <Form.Check
                        type="radio"
                        id="online"
                        name="paymentMethod"
                        label="Online Payment"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                      />
                    </Form>
                  </div>

                  <div className="d-grid gap-2">
                    <Button
                      variant="success"
                      size="lg"
                      onClick={placeOrder}
                      disabled={isPlacingOrder || !currentAddress}
                    >
                      {isPlacingOrder ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Placing Order...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPayment(false)}
                      disabled={isPlacingOrder}
                    >
                      Back to Cart
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;