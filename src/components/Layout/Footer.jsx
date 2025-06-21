import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Collapse } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import styles from "./Footer.module.css"; // We'll create this next

const Footer = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openPages, setOpenPages] = useState(false);
  const [email, setEmail] = useState("");

  const submitNewsletter = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="gy-4">
          {/* About Section */}
          <Col xs={12} md={4}>
            <button
              className={styles.sectionToggle}
              onClick={() => setOpenAbout(!openAbout)}
              aria-expanded={openAbout}
              aria-controls="about-collapse"
            >
              <h5>Shoppy</h5>
            </button>
            <Collapse in={openAbout} dimension="height">
              <div id="about-collapse">
                <p>&copy; {new Date().getFullYear()} Shoppy. All rights reserved.</p>
              </div>
            </Collapse>
            {/* Show by default on md+ */}
            <div className={styles.desktopOnly}>
              <p>&copy; {new Date().getFullYear()} Shoppy. All rights reserved.</p>
            </div>
          </Col>

          {/* Contact Section */}
          <Col xs={12} md={4}>
            <button
              className={styles.sectionToggle}
              onClick={() => setOpenContact(!openContact)}
              aria-expanded={openContact}
              aria-controls="contact-collapse"
            >
              <h5>Contact</h5>
            </button>
            <Collapse in={openContact} dimension="height">
              <div id="contact-collapse">
                <p>Email: support@shoppy.com</p>
                <p>Phone: +123-456-7890</p>
                <div className={styles.socialIcons}>
                  <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
                    <FaFacebookF />
                  </a>
                  <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </Collapse>
            <div className={styles.desktopOnly}>
              <p>Email: support@shoppy.com</p>
              <p>Phone: +123-456-7890</p>
              <div className={styles.socialIcons}>
                <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </Col>

          {/* Pages & Newsletter Section */}
          <Col xs={12} md={4}>
            <button
              className={styles.sectionToggle}
              onClick={() => setOpenPages(!openPages)}
              aria-expanded={openPages}
              aria-controls="pages-collapse"
            >
              <h5>Pages</h5>
            </button>
            <Collapse in={openPages} dimension="height">
              <div id="pages-collapse" className={styles.pagesSection}>
                <ul className="list-unstyled">
                  <li>
                    <a href="/about" className={styles.footerLink}>
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/category" className={styles.footerLink}>
                      Category
                    </a>
                  </li>
                  <li>
                    <a href="/orders" className={styles.footerLink}>
                      Orders
                    </a>
                  </li>
                </ul>
                <Form onSubmit={submitNewsletter} className="mt-3">
                  <Form.Group controlId="newsletterEmail">
                    <Form.Control
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={styles.newsletterInput}
                    />
                  </Form.Group>
                  <Button type="submit" className={styles.newsletterButton} variant="dark" size="sm" >
                    Subscribe
                  </Button>
                </Form>
              </div>
            </Collapse>
            <div className={styles.desktopOnly}>
              <ul className="list-unstyled">
                <li>
                  <a href="/about" className={styles.footerLink}>
                    About
                  </a>
                </li>
                <li>
                  <a href="/category" className={styles.footerLink}>
                    Category
                  </a>
                </li>
                <li>
                  <a href="/orders" className={styles.footerLink}>
                    Orders
                  </a>
                </li>
              </ul>
              <Form onSubmit={submitNewsletter} className="mt-3 d-flex">
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.newsletterInput}
                />
                <Button type="submit" className={styles.newsletterButton} variant="dark" size="sm">
                  Subscribe
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
