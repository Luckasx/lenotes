import React from "react";
import parse from "html-react-parser";
import { Row, Col } from "react-bootstrap";
import NoteFooter from "./note-footer";

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

  getNoteSize(note) {
    if (note.text.length <= 100) {
      return 2;
    }

    if (note.text.length <= 200) {
      return 3;
    }

    return 6;
  }

  render() {
    if (this.props.knotes === undefined) {
      return <span>No notes =(</span>;
    }

    return (
      <div>
        {this.props.knotes.map((note) => (
          <Row className="d-flex justify-content-center">
            <Col
              key={note._id}
              sm={this.getNoteSize(note)}
              className=" m-1 mt-2"
            >
              <div>
                <div
                  className={
                    note.backcolor +
                    " note-block note-content d-flex aligns-items-center justify-content-center "
                  }
                >
                  {parse(note.text)}
                </div>
                <NoteFooter note={note} />
              </div>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}

export default Notes;
