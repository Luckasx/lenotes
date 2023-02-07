import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

class LeNavBar extends React.Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    const isAuthenticated = (user && user.isAuthenticated);

    return (
      <Navbar bg="light" expand="lg" sticky="top" className="notes-nav-bar">
        <Container>
          <Navbar.Brand href="#home">LE NOTES</Navbar.Brand>          
          {!isAuthenticated && (            
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link href="/signup">Get Access</Nav.Link>
              <Nav.Link className="ms-4" href="/signin">
                Sign in
              </Nav.Link>
            </Navbar.Collapse>
          )}
          {isAuthenticated && <Navbar.Text>Hello {user.username}</Navbar.Text>}
        </Container>
      </Navbar>
    );
  }
}

export default LeNavBar;
