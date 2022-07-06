import React from "react";
import parse from "html-react-parser";
import { Row, Col } from "react-bootstrap";
import "./../styles/notes.css";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ name: newProps.notes });
  }

  getNoteSize(note){

    if(note.text.length <= 100){
      return 2;
    }

    if(note.text.length <= 200){
      return 3;
    }

    return 6;

  }

  render() {
    if (this.props.knotes === undefined) {
      return <span>No notes =(</span>;
    }

    return (
      <Row>
        {this.props.knotes.map((note) => (
          <Col sm={this.getNoteSize(note)} className="note-block px-2 m-1">
            <div className="note-content d-flex aligns-items-center justify-content-center ">
              {parse(note.text)}
            </div>
          </Col>
        ))}
      </Row>
    );
  }
}

export default Notes;
