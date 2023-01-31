import React, { Component } from "react";

import LeNavBar from "../components/LeNavBar";



import { Row, Col } from "react-bootstrap";
import SignInForm from "../components/SignInForm";



export default class Signin extends Component {

  

  constructor() {
    super();
    this.state = { checkboxChecked: false };    
  }


  render() {


    return (
      <div className="App container-fluid">
        <Row className="nav-bar-mb">
          <LeNavBar />
        </Row>
        <Row className="form-signin">
          <Col lg={{span: 4, offset:4}} md={{span: 6, offset:3}} sm={{span: 4, offset:4}}>         
            <SignInForm></SignInForm>
          </Col>
        </Row>
      </div>
    );
  }
}
