import React from "react";

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
    console.log("props", this.props);

    if (this.props.knotes === undefined) {
      return <span>No notes =(</span>;
    }

    return (
      <ul>
        {this.props.knotes.map((note) => (
          <li key={note._id}>{note.text}</li>
        ))}
      </ul>
    );
  }
}

// const notes = ({notes}) => (
//   <ul>{notes.map(note =>
//     <li key={note.id}>{note.id}</li>

//   )}
//   </ul>
// )

export default Notes;
