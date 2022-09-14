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
          <Col lg={{span: 2, offset:5}} md={{span: 6, offset:3}} sm={{span: 4, offset:4}}>
            {/* <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Choose your username" {...register("firstName", { required: true, maxLength: 20 })} />
                <Form.Text className="text-muted">                  
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Check
                  controlId="formBasicCheckbox"
                  type="checkbox"
                  label="I agree with everything you want"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!this.state.checkboxChecked}>
                Submit
              </Button>
            </Form> */}
            <SignUpForm></SignUpForm>
          </Col>
        </Row>
      </div>
    );
  }
}
