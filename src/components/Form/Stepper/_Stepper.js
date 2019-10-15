import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { filterProps } from "../../../helpers/functions";
import WithWrapper from "../_WithWrapper";
import * as helpers from "./helpers";
import classes from "./Stepper.scss";
import cn from "classnames";

/**
 * Renders an input with two buttons, + and -
 * Supports any step (int or float with 1 decimal), configurable min / max values
 *
 * @param {object} props component properties
 */
const Stepper = props => {
  const { name, ownLabel, id, value: defaultValue } = props;

  const [value, setValue] = useState(defaultValue);
  const input = useRef(null);
  const filteredProps = filterProps(Stepper.propTypes, props);

  return (
    <>
      {ownLabel && (
        <label htmlFor={id} className={classes.ownLabel}>
          {ownLabel}
        </label>
      )}
      <div
        className={cn(classes.stepperContainer, {
          [classes.disabled]: props.disabled
        })}
      >
        <button
          onClick={helpers.decrease(props, value, setValue)}
          type="button"
          className={classes.decrease}
          disabled={props.disabled}
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
          onChange={helpers.handleChange(setValue)}
          onFocus={helpers.emptyValue(setValue)}
          onBlur={helpers.handleBlur(props, value, setValue)}
          className={classes.input}
          ref={input}
        />
        <button
          onClick={helpers.increase(props, value, setValue)}
          type="button"
          className={classes.increase}
          disabled={props.disabled}
        >
          +
        </button>
      </div>
    </>
  );
};

Stepper.defaultProps = {
  value: 0,
  step: 1,
  min: 0,
  max: 5
};

Stepper.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired, // ID for label and
  name: PropTypes.string, // input name attribute
  step: PropTypes.number, // increment step, eg. 0.5 or 1
  max: PropTypes.number, // minimum value
  min: PropTypes.number, // maximum value
  onChange: PropTypes.func, // function from form wrapper
  ownLabel: PropTypes.string // the label to show, named like this to avoid clash with WithWrapper
};

export default WithWrapper(Stepper);
