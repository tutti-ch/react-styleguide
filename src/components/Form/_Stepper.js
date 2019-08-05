import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { filterProps } from "../../helpers/functions";
import WithWrapper from "./_WithWrapper";
import classes from "./Form.scss";

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
  const { min, max } = props;
  const newValue = validate(min, max, value);
  persistChange(props, newValue, setValue);
};

const decrease = (props, value, setValue) => () => {
  const { min, max, step } = props;
  const newValue = validate(min, max, value - step);
  persistChange(props, newValue, setValue);
};

const increase = (props, value, setValue) => () => {
  const { min, max, step } = props;
  const newValue = validate(min, max, value + step);
  persistChange(props, newValue, setValue);
};

const persistChange = (props, newValue, setValue) => {
  setValue(newValue);
  notify(props, newValue);
};

const validate = (min, max, newValue) => {
  const value = Number(newValue);

  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }

  return value;
};

const Input = props => {
  const { type, name, ownLabel, id, defaultValue } = props;

  const [value, setValue] = useState(defaultValue);
  const input = useRef(null);
  const filteredProps = filterProps(Input.propTypes, props);

  return (
    <>
      {ownLabel && (
        <label for={id} className={classes.ownLabel}>
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
          name={name}
          type={type}
          value={value}
          onChange={handleChange(setValue)}
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
  value: "",
  type: "text",
  defaultValue: 0,
  step: 1,
  min: 0,
  max: 5
};

Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  id: PropTypes.string.isRequired, // ID for label and
  step: PropTypes.number, // increment step, eg. 0.5 or 1
  max: PropTypes.number,
  min: PropTypes.number,
  type: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.number,
  ownLabel: PropTypes.string
};

export default WithWrapper(Input);
