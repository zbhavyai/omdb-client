import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar className="omdb-navbar" data-bs-theme="dark" expand="lg">
      <Container>
        <Nav.Link
          className="text-white"
          href="https://github.com/zbhavyai/omdb-client"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-github"></i>
        </Nav.Link>
        <Navbar.Text className="text-secondary">
          Powered by <strong>OMDb API</strong>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
