import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  selectAddress,
  addAddress,
} from "../../store/addressSlice";
import axios from "axios";
import { Button, ListGroup, Modal, Form, Spinner, Alert } from "react-bootstrap";

const DATABASE_URL =import.meta.env.VITE_DATABASE_URL;
const Addresses = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { addresses, selectedAddressId, loading, error } = useSelector(
    (state) => state.address
  );

  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (auth.token && auth.userId) {
      dispatch(fetchAddresses(auth.userId));
    }
  }, [auth.token, auth.userId, dispatch]);

  const handleSelect = (id) => {
    dispatch(selectAddress(id));
  };

  const handleInputChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewAddress = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await axios.post(
        `${DATABASE_URL}/addresses/${auth.userId}.json`,
        newAddress
      );

      const newId = res.data.name;
      dispatch(addAddress({ id: newId, ...newAddress }));

      setShowModal(false);
      setNewAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
      });
    } catch (err) {
      setSaveError("Failed to save new address.");
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div>
      <h5>Your Addresses</h5>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <ListGroup>
            {Object.entries(addresses).length === 0 && (
              <p>No addresses found. Please add one.</p>
            )}
            {Object.entries(addresses).map(([id, addr]) => (
              <ListGroup.Item
                key={id}
                active={id === selectedAddressId}
                onClick={() => handleSelect(id)}
                style={{ cursor: "pointer" }}
              >
                {addr.addressLine1}, {addr.addressLine2}, {addr.city},{" "}
                {addr.state} - {addr.zipCode}
                <br />
                Phone: {addr.phoneNumber}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Button className="mt-3" onClick={() => setShowModal(true)}>
            Add New Address
          </Button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {saveError && <Alert variant="danger">{saveError}</Alert>}
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAddress.addressLine1}
                    onChange={(e) =>
                      handleInputChange("addressLine1", e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAddress.addressLine2}
                    onChange={(e) =>
                      handleInputChange("addressLine2", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAddress.city}
                    onChange={(e) =>
                      handleInputChange("city", e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAddress.state}
                    onChange={(e) =>
                      handleInputChange("state", e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAddress.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={newAddress.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveNewAddress}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Address"}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Addresses;
