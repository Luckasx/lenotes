import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      visibility: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  handleVisibility(event){
    this.setState({
      visibility: event.target.value,
    });
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  saveNote() {
    console.log(this.state.text);
    fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ text: this.state.text }),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  render() {
    return (
      <Row>
        <Col sm="12" md="4" >
          <Form>
            <Row>
              <Col>
                <Form.Label>Type a New Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row className="mt-1 align-items-center ">
              <Col sm="4" md="3">
                <Form.Label>Choose visibility:</Form.Label>
              </Col>
              <Col sm="8" md="6">
                <Form.Select onChange="handleVisibility">
                  <option selected value="0">
                    Private
                  </option>
                  <option value="1">Public</option>
                </Form.Select>
              </Col>
            </Row>
            <Button className="mt-2" variant="primary" onClick={this.saveNote}>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
