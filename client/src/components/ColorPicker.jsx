import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ["s-white", "s-coral", "s-navy", "s-yellow"],
      selected: "s-white",
    };

    this.selectColor = this.selectColor.bind(this);
  }

  selectColor(val) {
    this.setState({
      selected: val,
    });

    this.props.selectedColor(val)
  }

  render() {
    return (
      <div
        id="color-picker"
        className="color-picker d-flex  aligns-items-center justify-content-center mt-1"
      >
        <span className="me-2">Color:</span>
        <div>
          {this.state.colors.map((el) => (
            <div
              value={el}
              key={el}
              type="radio"
              name="radio-color"              
              className={`${el} + " s-color ms-2 ${this.state.selected === el ? "color-selected" : ""}`}
              onClick={(e) => this.selectColor(el)}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}
