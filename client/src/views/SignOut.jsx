import { React } from "react";
import { Row, Col, Container } from "react-bootstrap";

import LeNavBar from "../components/LeNavBar";

export default function SignOutForm() {
  localStorage.removeItem("user");

  return (
    <Container fluid>
      <Row className="nav-bar-mb">
        <LeNavBar />
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 5 }}>
          <h5>You've logged out with success. See you soon.</h5>
        </Col>
      </Row>
    </Container>
  );
}
