
import { Offcanvas, Button, Form } from 'react-bootstrap';
import { toggleCart } from '../../store/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
const Cart = () => {

  const dispatch=useDispatch();
  const {isCartOpen}=useSelector((state)=>state.cart);





  return (

    <Offcanvas show={isCartOpen} onHide={() => dispatch(toggleCart())} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        
        <div className="mb-3 border-bottom pb-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              
              <img
                src="https://via.placeholder.com/60"
                alt="Sample Item"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  marginRight: "15px",
                }}
              />
              <div>
                <strong>Sample Item</strong>
                <div>₹999.00</div>
                <div className="d-flex align-items-center mt-1">
                  <Button variant="outline-secondary" size="sm" className="me-2">
                    -
                  </Button>
                  <span>1</span>
                  <Button variant="outline-secondary" size="sm" className="ms-2">
                    +
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Button variant="danger" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </div>

        
        <div className="mt-3">
          <h5>Total: ₹999.00</h5>
          <Button className="w-100 mt-2" variant="primary">
            Checkout
          </Button>

          <Form className="mt-3">
            <Form.Check
              type="radio"
              id="cod"
              name="paymentMethod"
              label="Cash on Delivery (COD)"
              defaultChecked
            />
            <Form.Check
              type="radio"
              id="online"
              name="paymentMethod"
              label="Online Payment"
            />
          </Form>
          <Button className="w-100 mt-3" variant="success">
            Buy
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Cart;