/**
 * Sends new value to the form so that we can submit it.
 *
 * @param {object} props component props
 * @param {number} newValue value to be sent to Form wrapper
 */
export const notify = (props, newValue) => {
  const { name, value, onChange } = props;
  if (typeof onChange === "function") {
    onChange(newValue, {
      name,
      initialValue: value,
      formValue: newValue
    });
  }
};

// We only set the state on change, don't validate or persist yet
export const handleChange = setValue => event => {
  setValue(event.target.value);
};

// On blur, validate what the user typed
export const handleBlur = (props, value, setValue) => () => {
  const { min, max, step } = props;
  const newValue = validate(min, max, value, step);
  persistChange(props, newValue, setValue);
};

export const decrease = (props, value, setValue) => () => {
  const { min, max, step } = props;
  const newValue = validate(min, max, value - step, step);
  persistChange(props, newValue, setValue);
};

export const increase = (props, value, setValue) => () => {
  const { min, max, step } = props;
  const newValue = validate(min, max, value + step, step);
  persistChange(props, newValue, setValue);
};

// Sets state and notifies form wrapper of the change
export const persistChange = (props, value, setValue) => {
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
export const validate = (min, max, newValue, step) => {
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
export const roundValue = (num, step) => {
  // Remove the remainder of the division and round it to nearest decimal
  return Math.round((num - (num % step)) * 10) / 10;
};

// We empty values when users click / tap on the input to make it easier for them (no backspace needed).
export const emptyValue = setValue => () => setValue("");
