import React, { Component } from "react";
import PropTypes from "prop-types";
import { filterProps } from "../../helpers/functions";
import WithWrapper from "./_WithWrapper";

export class Input extends Component {
  static defaultProps = {
    value: "",
    type: "text"
  };

  static propTypes = {
    /**
     * The initial value.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The input type.
     */
    type: PropTypes.string,

    /**
     * The input name.
     */
    name: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.notify = this.notify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  /**
   * Sync the value.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  /**
   * Notify the parent of the change.
   */
  notify() {
    if (this.changed === true && typeof this.props.onChange === "function") {
      const { name, value } = this.props;
      this.props.onChange(this.state.value, {
        name,
        initialValue: value,
        formValue: value
      });
    }

    // Reset the value
    this.changed = false;
  }

  /**
   * Notify the parent when blur occurs.
   *
   * @param event
   */
  handleBlur(event) {
    this.notify();

    // istanbul ignore else
    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(event);
    }
  }

  /**
   * Notify the parent when user presses enter.
   *
   * @param event
   */
  handleKeyUp(event) {
    if (event.key === "Enter") {
      this.notify();
    }

    if (typeof this.props.onKeyUp === "function") {
      this.props.onKeyUp(event);
    }
  }

  /**
   * Handle the change event.
   */
  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      // Next time when on blur or key up occurs,
      // they will know that the value changed.
      this.changed = true;
    });
  }

  render() {
    const { value } = this.state;
    const { type, name } = this.props;
    const props = filterProps(Input.propTypes, this.props);

    return (
      <input
        {...props}
        name={name}
        type={type}
        value={value}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeyUp}
        onChange={this.handleChange}
      />
    );
  }
}

export default WithWrapper(Input);
