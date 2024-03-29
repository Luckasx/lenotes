import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import ColorPicker from "./ColorPicker";
import NoteInput from "./NoteInput";
import axiosInstance from "../config/axios.config";

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      visibility: 0,
      message: "",
      messageClass: "",
      rows: 3,
      backcolor: "s-white",
    };

    this.saveNote = this.saveNote.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.inputText = this.inputText.bind(this);
    this.clearSaveMessage = this.clearSaveMessage.bind(this);
  }

  handleColor(color) {
    this.setState({
      backcolor: color,
    });
  }

  handleVisibility(event) {
    this.setState({
      visibility: event.target.value,
    });
  }

  //receives text from note-input component
  inputText(text) {
    this.setState({
      text,
    });
  }

  getRowsNumber(text) {
    if (text.length <= 100) {
      return 4;
    }

    if (text.length <= 500) {
      return 10;
    }

    if (text.length <= 1000) {
      return 20;
    }

    return 25;
  }

  saveNote = async () => {
    console.log(this.state.text);

    let texttoupload = await this.prepareNote();

    // Adding headers to the request
    let config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    let response = await axiosInstance.post(
      "/api/notes",
      {
        text: texttoupload,
        visibility: this.state.visibility,
        backcolor: this.state.backcolor,
      },
      config
    );
    

    this.showFeedbackCreation(response);
  };

  prepareNote = async () => {
    let temp = this.state.text;

    temp = this.replaceNewLines(temp);

    return temp;
  };

  replaceNewLines(text) {
    return text.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />");
  }

  showFeedbackCreation = async (res) => {
    let expectedMessage = "Note Created.";

    let response = await res.json();

    if (response.msg === expectedMessage) {
      this.setState(
        {
          text: "",
          message: "Your note is saved",
          messageClass: "text-success",
        },
        function () {
          this.clearSaveMessage();
        }
      );
    }

    if (response.msg !== expectedMessage) {
      this.setState({
        text: "",
        message: "There is a problem with the note. Error: " + response.msg,
        messageClass: "text-danger",
      });
    }
  };

  //clears from screen the OK save message
  clearSaveMessage() {
    setTimeout(() => {
      this.setState({
        text: "",
        message: "",
        messageClass: "",
      });
    }, 3000);
  }

  render() {
    return (
      <Row className="align-center">
        <Col sm="0" md="4"></Col>
        <Col sm="12" md="4">
          <Form>
            <Row className="row-textarea-note">
              <Col>
                <Form.Label>Type a New Note</Form.Label>
                <NoteInput
                  backcolor={this.state.backcolor}
                  inputText={this.inputText}
                />
              </Col>
            </Row>
            <Row className="mt-1 align-items-center ">
              <Col sm="4" md="3">
                <Form.Label>Visibility:</Form.Label>
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
            <Row>
              <ColorPicker selectedColor={this.handleColor} />
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
