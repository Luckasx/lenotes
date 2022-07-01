import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
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
      <Form>
        <Form.Label>Insert New Note</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={this.state.text}
          onChange={this.handleChange}
        />
        <Button className="mt-2" variant="primary" onClick={this.saveNote}>
          Save
        </Button>
      </Form>
    );
  }
}
