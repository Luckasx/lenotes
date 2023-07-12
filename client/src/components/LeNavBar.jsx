import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

class LeNavBar extends React.Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    const isAuthenticated = user?.isAuthenticated;

    return (
      <Navbar bg="light" expand="lg" sticky="top" className="notes-nav-bar">
        <Container>
          <Navbar.Brand href="#home">LE NOTES</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {!isAuthenticated && (
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <Nav.Link href="/signup">Get Access</Nav.Link>
                <Nav.Link className="ms-4" href="/signin">
                  Sign in
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          )}
          {isAuthenticated && (
            <Nav>
              <Navbar.Text>Hello {user.username}</Navbar.Text>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    );
  }
}

export default LeNavBar;
