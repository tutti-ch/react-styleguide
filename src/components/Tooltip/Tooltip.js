import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ToolTipComp from "./_Tooltip";
import Form from "../Form";

export default class Tooltip extends PureComponent {
  static propTypes = { className: PropTypes.string };

  reset = e => {
    e.preventDefault();
    localStorage.removeItem("tooltip-styleguide");
    this.refs.tooltip.setState({ render: true, closed: false });
  };

  state = {
    selectedArrow: "t"
  };

  arrowPositions = [
    { text: "Top center", value: "t" },
    { text: "Top right", value: "tr" },
    { text: "Top left", value: "tl" },

    { text: "Bottom center", value: "b" },
    { text: "Bottom right", value: "br" },
    { text: "Bottom left", value: "bl" },

    { text: "Right center", value: "r" },
    { text: "Right top", value: "rt" },
    { text: "Right bottom", value: "rb" },

    { text: "Left center", value: "l" },
    { text: "Left top", value: "lt" },
    { text: "Left bottom", value: "lb" }
  ];

  changeArrow = v => {
    this.setState({ selectedArrow: v });
  };

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <div style={{ marginBottom: "1rem" }}>
          <Form.Select
            onChange={this.changeArrow}
            options={this.arrowPositions}
            selected={this.state.selectedArrow}
          />
        </div>
        <ToolTipComp
          name={"tooltip-styleguide"}
          ref={"tooltip"}
          arrowPosition={this.state.selectedArrow}
        >
          This is the tooltip. It will fade away if you click on the close
          button.
        </ToolTipComp>
        <a href={"#"} onClick={this.reset}>
          Click to reset tooltip state
        </a>
      </div>
    );
  }
}
