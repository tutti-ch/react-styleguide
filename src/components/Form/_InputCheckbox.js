import React, { Component } from "react";
import PropTypes from "prop-types";
import { filterProps } from "../../helpers/functions";
import classes from "./Form.scss";
import WithWrapper from "./_WithWrapper";

export class InputCheckbox extends Component {
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
     * The label for the input.
     */
    label: PropTypes.string,

    /**
     * The input name.
     */
    name: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked
    };

    this.toggle = this.toggle.bind(this);
  }

  /**
   * Sync the value.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  /**
   * Toggle the input checkbox.
   */
  toggle() {
    this.setState({ checked: !this.state.checked }, () => {
      if (typeof this.props.onChange === "function") {
        const { name, checked, value } = this.props;
        const newValue = this.state.checked ? value : false;
        this.props.onChange(newValue, {
          name,
          initialValue: checked,
          formValue: newValue // Required for the getKeyValuePair function
        });
      }
    });
  }

  render() {
    const { value, checked } = this.state;
    const { label, name } = this.props;
    const props = filterProps(InputCheckbox.propTypes, this.props);

    return (
      // We do not use a real label here because react complains
      // about uncontrolled/controlled components.
      <span onClick={this.toggle} className={classes.cbLabel}>
        <input
          {...props}
          name={name}
          type="checkbox"
          value={value}
          checked={checked}
          onChange={this.toggle}
        />
        <span className={classes.labelText}>{label}</span>
      </span>
    );
  }
}

export default WithWrapper(InputCheckbox);
