import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { filterProps } from "@/helpers/functions";
import WithWrapper from "../_WithWrapper";
import classes from "./Stepper.scss";

/**
 * Sends new value to the form so that we can submit it.
 *
 * @param {object} props component props
 * @param {number} newValue value to be sent to Form wrapper
 */
const notify = (props, newValue) => () => {
  const { name, value, onChange } = props;
  if (typeof onChange === "function") {
    onChange(newValue, {
      name,
      initialValue: value,
      formValue: newValue
    });
  }
};

const handleChange = setValue => event => {
  setValue(event.target.value);
};

const handleBlur = (props, value, setValue) => () => {
  const { min, max, step } = props;
  const newValue = validate(min, max, value, step);
  persistChange(props, newValue, setValue);
};

const decrease = (props, value, setValue) => () => {
  const { min, max, step } = props;
  const newValue = validate(min, max, value - step, step);
  persistChange(props, newValue, setValue);
};

const increase = (props, value, setValue) => () => {
  const { min, max, step } = props;
  const newValue = validate(min, max, value + step, step);
  persistChange(props, newValue, setValue);
};

const persistChange = (props, value, setValue) => {
  setValue(value);
  notify(props, value);
};

/**
 * Given a number,it checks whether it's smaller or bigger than max & min.
 * It also converts to the closest half step.
 *
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @param {number} newValue Number to be validated
 */
const validate = (min, max, newValue, step) => {
  const value = Number(newValue);

  let cleanValue;
  if (isNaN(value)) {
    cleanValue = 0;
  } else {
    cleanValue = roundValue(value, step);
  }

  if (cleanValue > max) {
    return max;
  }
  if (cleanValue < min) {
    return min;
  }

  return cleanValue;
};

/**
 * Converts a given number to the closest valid value.
 * eg. If step is 0.5 and the user types 0.7, we'll convert to 0.5.
 *
 * @param {number} num Number to be rounded
 * @param {number} step Increment value, accepts any int or float with one decimal.
 */
const roundValue = (num, step) => {
  // Remove the remainder of the division and round it to nearest decimal
  return Math.round((num - (num % step)) * 10) / 10;
};

const emptyValue = setValue => () => setValue("");

const Input = props => {
  const { name, ownLabel, id, value: defaultValue } = props;

  const [value, setValue] = useState(defaultValue);
  const input = useRef(null);
  const filteredProps = filterProps(Input.propTypes, props);

  return (
    <>
      {ownLabel && (
        <label htmlFor={id} className={classes.ownLabel}>
          {ownLabel}
        </label>
      )}
      <div className={classes.stepperContainer}>
        <button
          onClick={decrease(props, value, setValue)}
          type="button"
          className={classes.decrease}
        >
          -
        </button>
        <input
          {...filteredProps}
          id={id}
          autoComplete="off"
          name={name}
          type="text"
          value={value}
          onChange={handleChange(setValue)}
          onFocus={emptyValue(setValue)}
          onBlur={handleBlur(props, value, setValue)}
          className={classes.input}
          ref={input}
        />
        <button
          onClick={increase(props, value, setValue)}
          type="button"
          className={classes.increase}
        >
          +
        </button>
      </div>
    </>
  );
};

Input.defaultProps = {
  value: 0,
  step: 1,
  min: 0,
  max: 5
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired, // ID for label and
  name: PropTypes.string, // input name attribute
  step: PropTypes.number, // increment step, eg. 0.5 or 1
  max: PropTypes.number, // minimum value
  min: PropTypes.number, // maximum value
  onChange: PropTypes.func, // function from form wrapper
  ownLabel: PropTypes.string // the label to show, named like this to avoid clash with WithWrapper
};

export default WithWrapper(Input);
