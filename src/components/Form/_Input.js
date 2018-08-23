import React, { Component } from "react";
import PropTypes from "prop-types";
import { filterProps } from "../../helpers/functions";
import WithWrapper from "./_WithWrapper";

// istanbul ignore next
const MutationObserver =
  typeof window !== "undefined"
    ? window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    : undefined;

export class Input extends Component {
  static defaultProps = {
    value: "",
    type: "text"
  };

  static propTypes = {
    /**
     * The initial value.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),

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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  // istanbul ignore next
  componentDidMount() {
    // This code fixes a bug which happens when a user saves information
    // such as login information, and the browser fills the input automatically.
    if (!this.props.value && MutationObserver) {
      this.observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          const target = mutation.target;

          if (
            target.defaultValue &&
            mutation.type === "attributes" &&
            mutation.attributeName === "defaultValue"
          ) {
            this.changed = true;
            this.setState({ value: target.defaultValue });
            this.notify();
            this.observer = this.observer.disconnect();
            target.defaultValue = ""; // Reset so that react does not complain about controlled inputs
          }
        });
      });

      this.observer.observe(this.refs.input, {
        attributes: true
      });
    }
  }

  // istanbul ignore next
  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Sync the value.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.changed = true;
      this.setState({ value: nextProps.value || "" }, this.notify);
    }
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
        initialValue: value,
        formValue: newValue
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
  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.notify();
    }

    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(event);
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
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        ref="input"
      />
    );
  }
}

export default WithWrapper(Input);
