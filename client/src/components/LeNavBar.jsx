import React from "react";
import { Row, Col, Nav, Navbar , Container} from "react-bootstrap";


class LeNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" fixed="top" className="notes-nav-bar">
        <Container>
          <Navbar.Brand href="#home">LE NOTES</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="/signup">
              Sign up
            </Nav.Link>
            <Nav.Link className="ms-4" href="/signin">
              Sign in
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}


export default LeNavBar;