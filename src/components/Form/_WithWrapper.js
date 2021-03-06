import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./Form.scss";
import isEqual from "lodash.isequal";
import { filterProps } from "../../helpers/functions";

/**
 * This is a high order component for having a wrapper around inputs.
 *
 * @param WrappedComponent
 * @param mergeProps The properties to merge.
 */
export default (WrappedComponent, mergeProps = {}) => {
  return class WithWrapper extends Component {
    static propTypes = {
      /**
       * The error message.
       */
      error: PropTypes.string,

      /**
       * Whether the input is inline or not.
       */
      inline: PropTypes.bool,

      /**
       * The input label.
       */
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

      /**
       * The classname.
       */
      className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
      ]),

      /**
       * Removes all margings on form wrapper
       */
      noMargin: PropTypes.bool,

      /**
       * Force the label stay on top.
       */
      labelOnTop: PropTypes.bool
    };

    static contextTypes = {
      register: PropTypes.func,
      unregister: PropTypes.func
    };

    static getNormalizedValue(props) {
      // Handle for radio inputs and checkboxes
      if (WrappedComponent.propTypes.checked) {
        return props.checked ? props.value : false;
      }

      return props.value || props.values || props.selected;
    }

    constructor(props, context) {
      super(props);

      // If checked property is defined on the child, it means it
      // is either a radio or a checkbox. For this cases, we required
      // that they are check to have a value to return to the Form component.
      const initialValue = WithWrapper.getNormalizedValue(props);

      this.state = {
        formValue: initialValue,
        error: props.error
      };

      this.context = context;

      this.register(context, props);
    }

    /**
     * Context function to register the component to the form.
     *
     * @param context
     * @param props
     */
    register(context, props) {
      if (typeof context.register === "function" && props.name) {
        context.register(props, this);
      }
    }

    /**
     * Context function to unregister the component to the form.
     *
     */
    unregister() {
      if (typeof this.context.unregister === "function" && this.props.name) {
        this.context.unregister(this.props.name);
      }
    }

    componentWillUnmount() {
      this.unregister();
    }

    /**
     * This function will be triggered by the Form component whenever
     * there is an error for this input.
     *
     * @param error
     */
    handleError = error => {
      this.setState({ error });
    };

    /**
     * This function is required by the form component. It will be used
     * to retrieve the value.
     *
     * @return {*}
     */
    getKeyValue = () => {
      const { name, disabled } = this.props;
      const value = this.state.formValue;
      const retVal = {};

      if (!disabled) {
        if (Array.isArray(name)) {
          name.forEach((n, i) => {
            retVal[n] = Array.isArray(value) ? value[i] : value;
          });
        } else {
          retVal[name] = Array.isArray(value) ? value[0] : value;
        }
      }
      return retVal;
    };

    componentDidUpdate(oldProps) {
      const newValue = WithWrapper.getNormalizedValue(this.props);
      const oldValue = WithWrapper.getNormalizedValue(oldProps);
      const state = {};

      if (newValue !== oldValue) {
        state.formValue = newValue;
      }

      if (oldProps.error !== this.props.error) {
        state.error = this.props.error;
      }

      if (Object.keys(state).length) {
        this.setState(state);
      }

      // Some components (e.g. Slider) allow name as an Array. For this reason
      // we have to use isEqual instead of a strict comparison.
      if (isEqual(oldProps.name, this.props.name) === false) {
        this.register(this.context, this.props);
      }
    }

    /**
     * Update the state to track if the input has value or not.
     *
     * @param {string} value The changed value
     * @param {*} opts The additional props that we want to pass to the parent (such as the input name)
     */
    handleOnChange = (value, opts = {}) => {
      this.setState({
        error: null,
        formValue: opts.formValue
      });

      // Do not confuse the parent, this is only required for this component.
      if (opts && typeof opts.formValue !== "undefined") {
        delete opts.formValue;
      }

      if (typeof this.props.onChange === "function") {
        this.props.onChange(value, opts);
      }
    };

    /**
     * On key up reset the error state.
     *
     * @param e
     */
    handleOnKeyup = e => {
      if (this.state.error) {
        this.setState({ error: null });
      }

      // Bubble the event.
      if (typeof this.props.onKeyUp === "function") {
        this.props.onKeyUp(e);
      }
    };

    render() {
      const { inline, className, type, placeholder, noMargin, labelOnTop } = this.props; // prettier-ignore
      const { error, formValue } = this.state;
      const hasValue = !!formValue || mergeProps.hasValue || labelOnTop;
      const injectedProps = filterProps(WithWrapper.propTypes, this.props);

      let { label } = this.props;

      // In case the WrappedComponent defines a label, omit adding the label here.
      if (WrappedComponent.propTypes.label) {
        injectedProps.label = label;
        label = null;
      }

      // Inject a wrapper function for on change
      injectedProps.onChange = this.handleOnChange;
      injectedProps.onKeyUp = this.handleOnKeyup;

      const wrapperClasses = classNames(
        classes.wrapper,
        {
          [classes.inline]: inline,
          [classes.hasValue]: hasValue,
          [classes.hasLabel]: label,
          [classes.hasPlaceholder]: !!placeholder,
          [classes.hidden]: type === "hidden"
        },
        mergeProps.className,
        { [classes.noMargin]: noMargin },
        className
      );

      return (
        <div className={wrapperClasses}>
          {<WrappedComponent {...injectedProps} />}
          {label && <span className={classes.label}>{label}</span>}
          {error && <span className={classes.error}>{error}</span>}
        </div>
      );
    }
  };
};
