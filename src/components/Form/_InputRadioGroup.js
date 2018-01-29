import React, { PureComponent, cloneElement, Children } from "react";
import PropTypes from "prop-types";
import WithWrapper from "./_WithWrapper";
import classes from "./Form.scss";

export class InputRadioGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.node,

    /**
     * The on change callback handler.
     */
    onChange: PropTypes.func,

    /**
     * A name to pass to children. If you provide a name
     * attribute on the child, it will overwrite.
     */
    name: PropTypes.string,

    /**
     * Label to show above the options
     */
    label: PropTypes.string
  };

  constructor(props) {
    super(props);

    const state = {
      selected: null,
      value: undefined
    };

    Children.map(this.props.children, (child, index) => {
      if (child.props.checked) {
        state.selected = index;
      }
    });

    this.state = state;
  }

  /**
   * Handle the on change.
   *
   * @param index
   * @return {function()}
   */
  handleOnChange(index) {
    return (value, props) => {
      const { onChange } = this.props;

      if (typeof onChange === "function") {
        onChange(value, props);
      }

      this.setState({ selected: index, value });
    };
  }

  render() {
    const { label } = this.props;
    return (
      <div>
        {label && <span className={classes.radioLabel}>{label}</span>}
        {Children.map(this.props.children, (child, index) =>
          cloneElement(child, {
            checked: this.state.selected === index,
            onChange: this.handleOnChange(index),
            name: this.props.name || child.props.name // Radio group has a precedence
          })
        )}
      </div>
    );
  }
}

export default WithWrapper(InputRadioGroup);
