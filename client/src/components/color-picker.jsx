import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ["s-white", "s-coral", "s-navy", "s-yellow"],
      selected: "s-white"
    };
  }

  render() {
    return (
      <div
        id="color-picker"
        className="color-picker d-flex  aligns-items-center justify-content-center"
      >
        <span className="me-2">Color:</span>
        {this.state.colors.map((el) => (
          <ButtonGroup className={el + " s-color me-2 mb-2 mt-1"}>
            <ToggleButton
              value={el}
              checked={this.state.selected === el}
              className={el + " s-color"}
              
            ></ToggleButton>
          </ButtonGroup>
        ))}
      </div>
    );
  }
}
