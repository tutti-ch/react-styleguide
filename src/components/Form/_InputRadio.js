import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { filterProps } from "../../helpers/functions";
import classes from "./Form.scss";

export default class InputRadio extends PureComponent {
  static defaultProps = {
    checked: false
  };

  static propTypes = {
    /**
     * Whether the checkbox is checked or not.
     */
    checked: PropTypes.bool,

    /**
     * The value of the input.
     */
    value: PropTypes.any,

    /**
     * The input name.
     */
    name: PropTypes.string,

    /**
     * The label for the input.
     */
    label: PropTypes.string,

    /**
     * The on change callback handler.
     */
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked
    };

    this.select = this.select.bind(this);
  }

  /**
   * Sync the value.
   */
  componentDidUpdate(oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  /**
   * Select the input radio.
   */
  select() {
    if (this.state.checked) {
      return;
    }

    // Toggling an input radio is not possible
    this.setState({ checked: true }, () => {
      if (typeof this.props.onChange === "function") {
        const { name, checked, value } = this.props;
        this.props.onChange(value, {
          name,
          initialValue: checked,
          formValue: value
        });
      }
    });
  }

  render() {
    const { value, checked } = this.state;
    const { label, name } = this.props;
    const props = filterProps(InputRadio.propTypes, this.props);

    return (
      // We do not use a real label here because react complains
      // about uncontrolled/controlled components.
      <span onClick={this.select} className={classes.cbLabel}>
        <input
          {...props}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={this.select}
        />
        <span className={classes.labelText}>{label}</span>
      </span>
    );
  }
}
