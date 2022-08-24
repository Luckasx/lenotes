import React from "react";
import { format } from "date-fns";

export default class NoteFooter extends React.Component {
  formatDate(date) {
    try {
      return format(Date.parse(date), "MM/dd/yyyy hh:mm:ss");
    } catch (err) {
      console.error(err);
      return date;
    }
  }

  render() {
    return (
      <div className="small">
        Posted at {this.formatDate(this.props.note.creationDate)}
      </div>
    );
  }
}
