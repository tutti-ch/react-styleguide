import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Input from "./_Input";
import Textarea from "./_Textarea";
import Radio from "./_InputRadio";
import RadioGroup from "./_InputRadioGroup";
import Checkbox from "./_InputCheckbox";
import Select from "./_Select";
import Stepper from "./_Stepper";
// import Slider from "./_Slider"; removed slider as we don't use it at the moment
import Toggle from "./_Toggle";
import Error from "./_Error";
import { filterProps } from "../../helpers/functions";
import classes from "./Form.scss";

export default class Form extends Component {
  static Input = Input;
  static Radio = Radio;
  static RadioGroup = RadioGroup;
  static Checkbox = Checkbox;
  static Select = Select;
  // static Slider = Slider;
  static Textarea = Textarea;
  static GenericError = Error;
  static Toggle = Toggle;
  static Stepper = Stepper;

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string
    ]),
    children: PropTypes.node,
    handleSubmit: PropTypes.func // Function to handle submit.
  };

  static childContextTypes = {
    register: PropTypes.func,
    onSubmit: PropTypes.func,
    genericErrorHandler: PropTypes.func
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

  inputs = [];
  listeners = [];
  submitting = false;

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
      },

      /**
       * Register a listener for the submit event.
       *
       * @param listener
       */
      onSubmit: listener => {
        this.listeners = this.listeners || [];
        this.listeners.push(listener);
      },

      /**
       * This is the generic error handler. In case the handleSubmit reject
       * passes an _error key, it will be displayed by this component.
       *
       * @param self
       */
      genericErrorHandler: self => {
        this.genericErrorHandler = self;
      }
    };
  }

  handleSubmit = e => {
    if (typeof this.props.handleSubmit !== "function") {
      return false;
    }

    e.preventDefault();

    // Prevent re-submitting form until promise is resolved/rejected.
    if (this.submitting) return false;
    this.submitting = true;

    let values = {};

    // Collect all values from the registered inputs.
    this.inputs.forEach(input => {
      // Reset error state
      if (input.error) {
        input.error = null;
        input.self.handleError(null);
      }

      const { self } = input;
      values = Form.assignKeyPair(values, self.getKeyValue());
    });

    // Make sure to reset the generic error state
    if (this.genericError && this.genericErrorHandler) {
      this.genericErrorHandler.setError(null);
    }

    // Notify listeners and tell them that we are submitting.
    this.listeners.forEach(l => l({ values, loading: true }));

    // Execute the handleSubmit function and wait for a response/reject.
    return this.props
      .handleSubmit(values)
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

          if (errors._error && this.genericErrorHandler) {
            this.genericErrorHandler.setError(errors._error);
          }
        }

        // So that we display the shake.
        this.genericError = errors ? !!errors._error : false;
        this.forceUpdate();
      })
      .then(() => {
        this.listeners.forEach(l => l({ values, loading: false }));
        this.submitting = false;
      });
  };

  /**
   * Reset listeners.
   */
  componentWillUnmount() {
    this.listeners = [];
  }

  render() {
    const props = filterProps(Form.propTypes, this.props);
    const formClasses = classNames(this.props.className, {
      [classes.hasError]:
        this.inputs.filter(i => i.error).length > 0 || this.genericError
    });

    return (
      <form {...props} onSubmit={this.handleSubmit} className={formClasses}>
        {this.props.children}
      </form>
    );
  }
}
