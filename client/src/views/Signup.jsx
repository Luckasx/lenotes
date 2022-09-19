import React, { Component } from "react";

import LeNavBar from "../components/LeNavBar";



import { Row, Col, Form, Button } from "react-bootstrap";
import SignUpForm from "../components/SignUpForm";



export default class Signup extends Component {

  

  constructor() {
    super();
    this.state = { checkboxChecked: false };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(evt) {
    this.setState({ checkboxChecked: evt.target.checked });
  }

  render() {


    return (
      <div className="App container-fluid">
        <Row className="nav-bar-mb">
          <LeNavBar />
        </Row>
        <Row className="form-signup">
          <Col lg={{span: 4, offset:4}} md={{span: 6, offset:3}} sm={{span: 4, offset:4}}>         
            <SignUpForm></SignUpForm>
          </Col>
        </Row>
      </div>
    );
  }
}
