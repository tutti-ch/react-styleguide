import React, { Component } from "react";
import PropTypes from "prop-types";
import { filterProps } from "../../helpers/functions";
import WithWrapper from "./_WithWrapper";

export class Textarea extends Component {
  static defaultProps = {
    value: ""
  };

  static propTypes = {
    /**
     * The initial value.
     */
    value: PropTypes.string,

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
  componentDidUpdate(oldProps) {
    if (oldProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  /**
   * Handle the change event.
   */
  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      this.changed = true;
    });
  }

  /**
   * Notify the parent of the change.
   */
  notify() {
    if (this.changed === true && typeof this.props.onChange === "function") {
      const { name, value } = this.props;
      const newValue = this.state.value;
      this.props.onChange(newValue, {
        name,
        formValue: newValue,
        initialValue: value
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

  render() {
    const { value } = this.state;
    const { name } = this.props;
    const props = filterProps(Textarea.propTypes, this.props);

    return (
      <textarea
        {...props}
        name={name}
        value={value}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeyUp}
        onChange={this.handleChange}
      />
    );
  }
}

export default WithWrapper(Textarea);
