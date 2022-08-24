import React from "react";
import { Row, Col, Navbar , Container} from "react-bootstrap";

class LeNavBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">LE NOTES</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Sign up
            </Navbar.Text>
            <Navbar.Text class="ms-3">
              Sign in
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}


export default LeNavBar;