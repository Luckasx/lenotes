import React from "react";
import { Row, Col } from "react-bootstrap";

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

  render() {
    
    const noteStyle = {
      border: "1px solid gray",
      minHeight: "200%",
      color: "red"
    }

    if (this.props.knotes === undefined) {
      return <span>No notes =(</span>;
    }

    return (
      this.props.knotes.map((note) => (
      <Col sm="3" className={noteStyle}>      
        { note.text}
      </Col>
      ))
    );
  }
}

export default Notes;
