import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      visibility: 0,
      message: "",
      messageClass: "",
      rows: 3
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  handleVisibility(event) {
    this.setState({
      visibility: event.target.value,
    });
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
      rows: this.getRowsNumber(event.target.value)
    });
  }
  
  getRowsNumber(text){
    if(text.length <= 100){
      return 4;
    }

    if(text.length <= 500){
      return 10;
    }

    if(text.length <= 1000){
      return 20;
    }

    return 25;

  }

  saveNote = async () => {
    console.log(this.state.text);

    let texttoupload = await this.prepareNote();

    let response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        text: texttoupload,
        visibility: this.state.visibility,
      }),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    this.showFeedbackCreation(response);
   
  };

  prepareNote = async () => {

    let temp = this.state.text;

    temp = this.replaceNewLines(temp)

    return temp;

  }

  replaceNewLines (text){
    return text.replace(/\r\n/g,"<br />").replace(/\n/g, "<br />");
  }

  showFeedbackCreation = async (res ) => {

    let expectedMessage = "Note Created.";

    let response = await res.json();

    if (response.msg === expectedMessage) {
      this.setState({
        text: "",
        message: "Your note is saved",
        messageClass: "text-success",
      });
    }

    if (response.msg !== expectedMessage) {
      this.setState({
        text: "",
        message: "There is a problem with the note. Error: " + response.msg,
        messageClass: "text-danger",
      });
    }

  }

  render() {
    return (
      <Row>
        <Col sm="12" md="4">
          <Form>
            <Row>
              <Col>
                <Form.Label>Type a New Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={this.state.rows}
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
                <Form.Select
                  defaultValue={this.state.visibility}
                  onChange={(e) => this.handleVisibility(e)}
                >
                  <option value="0">Private</option>
                  <option value="1">Public View</option>
                  <option value="2">Public Edition</option>
                </Form.Select>
              </Col>
            </Row>
            <Button
              disabled={this.state.text.length === 0}
              className="mt-2"
              variant="primary"
              onClick={this.saveNote}
            >
              Save
            </Button>
            <Row>
              <Form.Label className={this.state.messageClass}>
                {" "}
                {this.state.message}
              </Form.Label>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}
