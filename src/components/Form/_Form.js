import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Input from "./_Input";
import Textarea from "./_Textarea";
import Radio from "./_InputRadio";
import RadioGroup from "./_InputRadioGroup";
import Checkbox from "./_InputCheckbox";
import Select from "./_Select";
import Slider from "./_Slider";
import { filterProps } from "../../helpers/functions";
import classes from "./Form.scss";

export default class Form extends Component {
  static Input = Input;
  static Radio = Radio;
  static RadioGroup = RadioGroup;
  static Checkbox = Checkbox;
  static Select = Select;
  static Slider = Slider;
  static Textarea = Textarea;

  static propTypes = {
    children: PropTypes.node,
    handleSubmit: PropTypes.func.isRequired // Function to handle submit.
  };

  static childContextTypes = {
    register: PropTypes.func
  };

  /**
   * Assign key value pair to the first object. In case a property
   * already exists, this function will aggregate the results.
   *
   * @example
   * arguments: { a: "b" }, { a: "c", d: 1 }
   * returns: { a: ["b", "c"], d: 1 }
   *
   * @param values
   * @param keyValuePair
   */
  static assignKeyPair(values, keyValuePair) {
    Object.keys(keyValuePair).forEach(k => {
      // Skip empty values.
      if (keyValuePair[k] === null || typeof keyValuePair[k] === "undefined") {
        return;
      }

      if (values[k]) {
        // Cast to an array ({ a: "b" } becomes { a: ["b"] })
        if (!Array.isArray(values[k])) {
          values[k] = [values[k]];
        }

        values[k].push(keyValuePair[k]);
      } else {
        values[k] = keyValuePair[k];
      }
    });

    return values;
  }

  constructor(props) {
    super(props);
    this.inputs = [];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getChildContext() {
    return {
      /**
       * Callback function to let the child component register itself on the form.
       * Once registered, the Form component will require the child to have two methods:
       * - handleError
       * - getKeyValue
       *
       * @param {object|Array} props
       * @param {string} props.name
       * @param {*} props.value
       * @param {*} props.values Some components (Slider) uses the plural name
       * @param {object} self The instance.
       */
      register: (props, self) => {
        const { name, value } = props;
        this.inputs = this.inputs || [];
        this.inputs.push({
          defaultValue: value || props.values, // Values is used by slider
          error: null,
          name,
          self
        });
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let values = {};

    this.inputs.forEach(input => {
      // Reset error state
      if (input.error) {
        input.error = null;
        input.self.handleError(null);
      }

      const { self } = input;

      // istanbul ignore else
      if (self.props.checked !== false) {
        values = Form.assignKeyPair(values, self.getKeyValue());
      }
    });

    return this.props
      .handleSubmit(values)
      .then()
      .catch(errors => {
        if (errors !== null && typeof errors === "object") {
          Object.keys(errors).forEach(key => {
            for (let i = 0; i < this.inputs.length; i++) {
              const input = this.inputs[i];

              if (input.name === key) {
                input.self.handleError(errors[key]);
                input.error = errors[key];
                break;
              }
            }
          });
        }

        // So that we display the shake.
        this.forceUpdate();
      });
  }

  render() {
    const props = filterProps(Form.propTypes, this.props);
    const formClasses = classNames({
      [classes.hasError]: this.inputs.filter(i => i.error).length > 0
    });

    return (
      <form {...props} onSubmit={this.handleSubmit} className={formClasses}>
        {this.props.children}
      </form>
    );
  }
}
