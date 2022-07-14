// https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
// https://stackoverflow.com/questions/45306325/react-contenteditable-and-cursor-position
//https://www.taniarascia.com/content-editable-elements-in-javascript-react/

import React from "react";

//https://stackoverflow.com/questions/55881397/react-how-to-maintain-caret-position-when-editing-contenteditable-div
import CaretPositioning from "./../_helpers/EditCaretPositioning";

export default class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      text_to_save: "",
      caretPosition: {
        start: 0,
        end: 0,
      },
    };

    this.textareaEl = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
  }

  handlePaste(event) {
    event.preventDefault();

    document.execCommand("insertHTML", false, event.clipboardData.getData("text/html"));

    this.updateText(this.state.text + event.clipboardData.getData("text"));

    //this.textareaEl.current.textContent =  this.cleanHtml(this.state.text + event.clipboardData.getData("text"))
  }

  updateText(event, text) {
    let savedCaretPosition = CaretPositioning.saveSelection(
      event.currentTarget
    );
    this.setState(
      {
        text: this.cleanHtml(text),
        caretPosition: savedCaretPosition,
      },
      () => {
        //restore caret position(s)
        CaretPositioning.restoreSelection(
          document.getElementById("editable"),
          this.state.caretPosition
        );
      }
    );
  }

  handleChange(event) {
    event.preventDefault();

    let keysToAvoid = [
      20, 16, 9, 27, 17, 91, 19, 18, 93, 35, 36, 37, 38, 39, 40, 45, 33, 34,
      112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145,
    ];

    if (keysToAvoid.indexOf(event.keyCode) > -1) {
      return false;
    }

    this.updateText(event.target.innerHTML);

    
  }

  cleanHtml(text) {
    let tags = ["span", "div", "p", "script"];

    let temp = text;

    //remove HTML space
    temp = temp.replace("&nbsp;", " ");

    //insert HTML space
    temp = temp.replace(/(\r\n)|\n/g, "<br>");

    tags.forEach((el) => {
      let re = new RegExp(`</?${el}>`, "g");
      temp = temp.replace(re, "");
    });

    return temp;
  }

  render() {
    return (
      <div
        className={
          this.props.backcolor +
          " input-textarea-note " +
          this.state.selectingClass
        }
        id="editable"
        contentEditable={true}
        ref={this.textareaEl}
        tabIndex="0"
        onPaste={this.handlePaste}
        onKeyUp={this.handleChange}
        suppressContentEditableWarning={true}
      ></div>
    );
  }
}
