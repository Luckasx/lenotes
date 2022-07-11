import React from "react";

export default class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
  }

  handlePaste(event) {
    console.log("handlePaste", event.clipboardData.getData('text'));

     this.setState({
       text: this.cleanHtml(event.clipboardData.getData('text'))
     });
  }

  handleChange(event) {
    console.log("handleChange", event.target.innerHTML);
     this.setState({
       text: this.cleanHtml(event.target.innerHTML)
     });
  }

  cleanHtml(text){

    let tags = ["span", "div"];

    let temp = text;

    tags.forEach(el => {
        let re = new RegExp(`<${el}>`, "g")
        temp = temp.replace(re, "");
    })

     

    console.log("pós replace", temp);

    return temp;
  }

  render() {
    return (
      <div
        contentEditable={true}
        className={this.props.backcolor + " input-textarea-note"}
        tabIndex="0"
        onPaste={this.handlePaste}
        suppressContentEditableWarning={true}
      >
        {this.state.text}
      </div>
    );
  }
}
