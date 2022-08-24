import React from "react";
import parse from "html-react-parser";
import { Row, Col } from "react-bootstrap";
import NoteFooter from "./NoteFooter";

class Notes extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      knotes:[]
    }
  }

  async componentDidMount() {
    
    await this.getNotes()
      .then((res) => {
        this.setState({
          knotes: res,          
        });
      })
      .catch((err) => console.log(err));
  }


  getNotes = async () => {
    const response = await fetch("/api/notes");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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
    if (this.state.knotes === undefined) {
      return <span>No notes =(</span>;
    }

    return (
      <div>
        {this.state.knotes.map((note) => (
          <Row className="d-flex justify-content-center" key={note._id.substr(6)}>
            <Col
              
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
