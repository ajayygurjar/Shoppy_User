import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../store/cartSlice";
import { Offcanvas, Button, Form } from "react-bootstrap";
import axios from "axios";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isCartOpen, cartItems, totalAmount } = useSelector(
    (state) => state.cart
  );

  // Local state to toggle payment options and selected method
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // POST order to Firebase
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderData = {
      items: cartItems,
      totalAmount,
      paymentMethod,
      orderDate: new Date().toISOString(),
      status: "placed",
    };

    try {
      // Replace with your Firebase URL for orders
      await axios.post(
        `https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json`,
        orderData
      );
      alert("Order placed!");
      dispatch(clearCart());
      setShowPayment(false);
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(error);
    }
  };

  return (
    <Offcanvas
      show={isCartOpen}
      onHide={() => dispatch(toggleCart())}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="mb-3 border-bottom pb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {/* Item image */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginRight: "15px",
                      }}
                    />
                    <div>
                      <strong>{item.title}</strong>
                      <div>₹{Number(item.price).toFixed(2)}</div>
                      <div className="d-flex align-items-center mt-1">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-2"
                          onClick={() => dispatch(decreaseQty(item.id))}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="ms-2"
                          onClick={() => dispatch(increaseQty(item.id))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-3">
              <h5>Total: ₹{Number(totalAmount || 0).toFixed(2)}</h5>

              {!showPayment && (
                <Button
                  className="w-100 mt-2"
                  variant="primary"
                  onClick={() => setShowPayment(true)}
                >
                  Checkout
                </Button>
              )}

              {showPayment && (
                <>
                  <Form>
                    <Form.Check
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      label="Cash on Delivery (COD)"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
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
                  <Button
                    className="w-100 mt-3"
                    variant="success"
                    onClick={placeOrder}
                  >
                    Buy
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartDrawer;
