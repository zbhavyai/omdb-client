import React from "react";
import { Container, Image, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container className="py-1">
        <Navbar.Brand href="/" className="header-font fw-bold">
          <Image src="/logo192.png" alt="logo" width="40" height="40" className="mx-2 header-icon" />
          OMDb Client
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
