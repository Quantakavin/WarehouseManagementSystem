import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown, Navbar, Container, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar
      variant="dark"
      style={{ background: "#0A2540", display: "flex" }}
      expand="lg"
      className="navbar"
    >
      {/* <Container fluid> */}
        {/* <Navbar.Toggle aria-controls="navbar-dark-example" /> */}
        {/* <Navbar.Collapse id="navbar-dark-example"> */}
          <Nav className="nav">
            <h3>ISDN Holdings</h3>
        
          </Nav>
        {/* </Navbar.Collapse> */}
      {/* </Container> */}
    </Navbar>
  );
}
export default NavBar;
