import React from "react";
import parse from "html-react-parser";
import { Row, Col } from "react-bootstrap";
import NoteFooter from "./NoteFooter";
import axiosInstance from "../config/axios.config";

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
    const response = await axiosInstance.get("/api/notes");
    const body = await response.data;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getNoteSize(note) {

    if(note.text == null){
      return 0;
    }

    if (note.text.length <= 100) {
      return 2;
    }

    if (note.text.length <= 200) {
      return 3;
    }

    return 6;
  }

  render() {
    if (this.state.knotes === undefined || this.state.knotes.length === 0) {
      return <span>Wow, such empty. =(</span>;
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
