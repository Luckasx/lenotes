// https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
// https://stackoverflow.com/questions/45306325/react-contenteditable-and-cursor-position

import React from "react";

export default class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      text_to_save: "",
      selectingClass: "",
      range: {},
      afterFocus: [],
      selection: {},
    };

    this.textareaEl = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
  }

  handlePaste(event) {
    event.preventDefault();
    console.log("handlePaste", event.clipboardData.getData("text"));

    this.textareaEl.current.textContent =  this.cleanHtml(this.state.text + event.clipboardData.getData("text"))
    
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

    this.textareaEl.current.textContent = event.target.textContent;
    
  }

  cleanHtml(text) {
    let tags = ["span", "div", "p", "script"];

    let temp = text;

    tags.forEach((el) => {
      let re = new RegExp(`<${el}\\s.*>`, "g");
      temp = temp.replace(re, "");
    });

    temp = temp.replace("&nbsp;", " ");

    console.log("pós replace", temp);

    return temp;
  }

  render() {
    return (
      <div>
        <div
          id="editable"
          contentEditable={true}
          className={
            this.props.backcolor +
            " input-textarea-note " +
            this.state.selectingClass
          }
          ref={this.textareaEl}
          tabIndex="0"
          onPaste={this.handlePaste}
          onChange={this.handleChange}
          suppressContentEditableWarning={true}
        ></div>
      </div>
    );
  }
}
