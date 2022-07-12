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
      selection: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.captureSelection = this.captureSelection.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  handlePaste(event) {
    //event.preventDefault();
    console.log("handlePaste", event.clipboardData.getData("text"));

    this.setState({
      text: this.cleanHtml(
        this.state.text + event.clipboardData.getData("text")
      ),
    });
  }

  handleChange(event) {
    this.setState({
      text: this.cleanHtml(this.state.text + event.target.innerHTML),
    });
  }

  captureSelection(e) {
    let editable = document.getElementById("editable"),
      selection;
      

    // Don't capture selection outside editable region
    var isOrContainsAnchor = false,
      isOrContainsFocus = false,
      sel = window.getSelection(),
      parentAnchor = sel.anchorNode,
      parentFocus = sel.focusNode;

    while (parentAnchor && parentAnchor !== document.documentElement) {
      if (parentAnchor === editable) {
        isOrContainsAnchor = true;
      }
      parentAnchor = parentAnchor.parentNode;
    }

    while (parentFocus && parentFocus !== document.documentElement) {
      if (parentFocus === editable) {
        isOrContainsFocus = true;
      }
      parentFocus = parentFocus.parentNode;
    }

    if (!isOrContainsAnchor || !isOrContainsFocus) {
      return;
    }

    selection = window.getSelection();

    // Get range (standards)
    if (selection.getRangeAt !== undefined) {
      this.setState(
        {
          range: selection.getRangeAt(0),
          selection
        }
      )
      

      // Get range (Safari 2)
    } else if (
      document.createRange &&
      selection.anchorNode &&
      selection.anchorOffset &&
      selection.focusNode &&
      selection.focusOffset
    ) {
      let rangeTemp;

      rangeTemp = document.createRange();
      rangeTemp.setStart(selection.anchorNode, selection.anchorOffset);
      rangeTemp.setEnd(selection.focusNode, selection.focusOffset);

      this.setState(
        {
          range: rangeTemp
        }
      )
    } else {
      // Failure here, not handled by the rest of the script.
      // Probably IE or some older browser
    }
  }

  onMouseDown(e) {
    // Recalculate selection after clicking/drag-selecting
    this.setState({
      selectingClass: "selecting",
    });
  }

  onMouseUp(e) {
    if (this.state.selectingClass.match(/\sselecting(\s|$)/)) {
      this.setState({
        selectingClass: "",
      });
      this.captureSelection();
    }
  }

  onBlur(e){
    
    var cursorStart = document.createElement("span"),
        collapsed = !!this.state.range.collapsed;

      cursorStart.id = "cursorStart";
      cursorStart.appendChild(document.createTextNode("—"));

      // Insert beginning cursor marker
      this.state.range.insertNode(cursorStart);

      // Insert end cursor marker if any text is selected
      if (!collapsed) {
        var cursorEnd = document.createElement("span");
        cursorEnd.id = "cursorEnd";
        this.state.range.collapse();
        this.state.range.insertNode(cursorEnd);
      }
  }

  onFocus(e){
// Slight delay will avoid the initial selection
      // (at start or of contents depending on browser) being mistaken
      setTimeout(function () {
        var cursorStart = document.getElementById("cursorStart"),
          cursorEnd = document.getElementById("cursorEnd");

        // Don't do anything if user is creating a new selection
        if (this.state.selectingClass.match(/\sselecting(\s|$)/)) {
          if (cursorStart) {
            cursorStart.parentNode.removeChild(cursorStart);
          }
          if (cursorEnd) {
            cursorEnd.parentNode.removeChild(cursorEnd);
          }
        } else if (cursorStart) {
          this.captureSelection();
          var range = document.createRange();

          if (cursorEnd) {
            range.setStartAfter(cursorStart);
            range.setEndBefore(cursorEnd);

            this.setState({
              range
            })

            // Delete cursor markers
            cursorStart.parentNode.removeChild(cursorStart);
            cursorEnd.parentNode.removeChild(cursorEnd);

            // Select range
            this.state.selection.removeAllRanges();
            this.state.selection.addRange(range);
          } else {
            range.selectNode(cursorStart);

            // Select range
            this.state.selection.removeAllRanges();
            this.state.selection.addRange(range);

            // Delete cursor marker
            document.execCommand("delete", false, null);
          }
        }

        // Call callbacks here
        for (var i = 0; i < this.state.afterFocus.length; i++) {
          this.state.afterFocus[i]();
        }
        
        this.setState({
          afterFocus : []
        });

        // Register selection again
        this.captureSelection();
      }, 10);
  }
  

  //https://stackoverflow.com/questions/1181700/set-cursor-position-on-contenteditable-div
  setFocus() {
    
    
    // Add callbacks to afterFocus to be called after cursor is replaced
    // if you like, this would be useful for styling buttons and so on    
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
      <div
        id="editable"
        contentEditable={true}
        className={
          this.props.backcolor +
          " input-textarea-note " +
          this.state.selectingClass
        }
        tabIndex="0"
        onPaste={this.handlePaste}
        // onKeyUp={this.captureSelection}
        // onMouseDown={this.onMouseDown}
        // onMouseUp={this.onMouseUp}
        // onFocus={this.onFocus}
        // onBlur={this.onBlur}
        suppressContentEditableWarning={true}
      >
        {this.state.text}
      </div>
    );
  }
}
