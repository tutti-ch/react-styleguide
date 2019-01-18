import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import WithWrapper from "./_WithWrapper";
import get from "lodash.get";
import classes from "./Form.scss";

export class Slider extends Component {
  static defaultProps = {
    template: "",
    minDistance: 10,
    prefix: "",
    suffix: "",
    values: [],
    mouseThreshold: 50
  };

  static propTypes = {
    /**
     * The minimum range.
     */
    min: PropTypes.number,

    /**
     * The maximum range.
     */
    max: PropTypes.number,

    values: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * If provided, the functionality of the array changes. Step, minValue,
     * maxValue, min, max will be ignored.
     */
    range: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
      })
    ),

    /**
     * The minimum range in pixels between the two thumbs.
     */
    minDistance: PropTypes.number,

    /**
     * The prefix for the values. Could be a string or an array.
     * If an array is given, the first value is for the minimum value
     * and the second value is for the maximum value.
     */
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

    /**
     * The suffix for the values. Could be a string or an array.
     * If an array is given, the first value is for the minimum value
     * and the second value is for the maximum value.
     */
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

    /**
     * The step number.
     */
    step: PropTypes.number,

    /**
     * Whether to have two sliders or one.
     */
    multiple: PropTypes.bool,

    /**
     * The label that will be displayed.
     */
    label: PropTypes.string,

    /**
     * The name of the input. In case of multiple inputs, provide an array with two indexes.
     */
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),

    /**
     * Number of decimals in case step is < 0.
     */
    decimals: PropTypes.number,

    /**
     * The placeholder in case value is empty.
     */
    placeholder: PropTypes.string,

    /**
     * Whether the extremes should return value null or not. Defaults false.
     */
    extremes: PropTypes.bool,

    /**
     * Number of pixels that you need to pull in order to reset filters.
     */
    mouseThreshold: PropTypes.number
  };

  /**
   * Return the clientX value of the event.
   *
   * @param e
   * @return {*}
   */
  static clientX(e) {
    let clientX;

    if (e.clientX) clientX = e.clientX;
    if (e.touches && e.touches[0]) clientX = e.touches[0].clientX;

    // When the user goes out of the browser, clientX has a negative value.
    // To overcome some weird bugs, always make sure that it stays positive.
    // Also, FF returns NaN, so make sure that we always fallback to 0.
    return Math.max(clientX, 0) || 0;
  }

  /**
   * Return the percentage.
   *
   * @param val
   * @param total
   * @return {number}
   */
  static perc(val, total) {
    return (100 * val) / total;
  }

  /**
   * Returns true if value is NaN or a null value.
   *
   * @param val
   * @return {boolean}
   */
  static isEmpty(val) {
    return isNaN(val) || val === null || typeof val === "undefined";
  }

  /**
   * Validate the props.
   */
  static validate(props) {
    const require = (c, m) => { if (!c) throw new Error(m); }; // prettier-ignore

    if (props.multiple) {
      require(!props.name || Array.isArray(props.name), "[Slider]: Multiple thumbs require multiple names. Use an array with two values for the `name` prop."); // prettier-ignore
    }

    if (typeof props.min === "undefined" || typeof props.max === "undefined") {
      require(Array.isArray(props.range) && props.range.length);
    }
  }

  constructor(props) {
    super(props);
    Slider.validate(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);
    this.calculateMousePosition = this.calculateMousePosition.bind(this);
    this.calculateMouseValue = this.calculateMouseValue.bind(this);
    this.calculateClosestValue = this.calculateClosestValue.bind(this);
    this.validateThumbPosition = this.validateThumbPosition.bind(this);
    this.handleExtremes = this.handleExtremes.bind(this);
    this.getFormattedValue = this.getFormattedValue.bind(this);
    this.getMaxRange = this.getMaxRange.bind(this);
    this.getMinRange = this.getMinRange.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.notifyParent = this.notifyParent.bind(this);

    // In case values are not null make sure that min is smaller than max
    const minValue =
      Math.min(props.values[0], props.values[1]) || props.values[0];
    const maxValue =
      Math.max(props.values[0], props.values[1]) || props.values[1];

    this.state = {
      min: {
        range: this.getMinRange(), // Range is leftmost value
        input: Array.isArray(props.name) ? props.name[0] : props.name,
        value: parseInt(minValue, 10) // Currently selected value
      },
      max: {
        range: this.getMaxRange(), // Range is the rightmost value
        input: Array.isArray(props.name) ? props.name[1] : props.name,
        value: parseInt(maxValue, 10) // Currently selected value
      },
      prefix: Array.isArray(props.prefix)
        ? props.prefix
        : [props.prefix, props.prefix],
      suffix: Array.isArray(props.suffix)
        ? props.suffix
        : [props.suffix, props.suffix]
    };
  }

  /**
   * Register the root component here to save some operations later.
   */
  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);

    // The timeout is required so that refs are mounted properly
    setTimeout(() => {
      const max = { ...this.state.max };
      const min = { ...this.state.min };

      if (this.refs.min) {
        this.target = this.refs.min;
        min.position = this.calculatePosition(min.value || this.getMinRange());
      }

      if (this.refs.max) {
        this.target = this.refs.max;
        max.position = this.calculatePosition(max.value || this.getMaxRange());
      }

      this.setState({ max, min });
    });
  }

  componentDidUpdate(oldProps) {
    const { name } = this.props;

    if (name !== oldProps.name) {
      const state = {};

      state.min = {
        ...this.state.min,
        input: Array.isArray(name) ? name[0] : name
      };
      state.max = {
        ...this.state.max,
        input: Array.isArray(name) ? name[1] : name
      };

      if (Object.keys(state).length) {
        this.setState(state);
      }
    }
  }

  /**
   * Return a callback function to notify the parent of the changes.
   *
   * @param {string} prop min|max
   */
  notifyParent(prop) {
    return () => {
      const { onChange } = this.props;

      if (typeof onChange === "function") {
        onChange(this.state[prop].value, {
          name: this.state[prop].input,
          initialValue: this.props.values[prop === "min" ? 0 : 1],
          formValue: [this.state.min.value, this.state.max.value] // Required for the _Form component.
        });
      }
    };
  }

  /**
   * Given a value, calculate the position in percentage.
   *
   * @param {number|string} value
   * @return {number|null} Returns null in case value is also empty.
   */
  calculatePosition(value) {
    if (value === null) return null;

    const minRange = this.state.min.range;
    const maxRange = this.state.max.range;

    if (value === minRange) return 0;
    if (value === maxRange) return this.validateThumbPosition(100);

    const total = maxRange - minRange;
    const distance = value - minRange;

    return this.validateThumbPosition((distance * 100) / total);
  }

  /**
   * Calculate the mouse position in percentage. This function supports also
   * touch events.
   *
   * @param {Object} e The mouse event.
   * @return {number}
   */
  calculateMousePosition(e) {
    const rect = this.root.getBoundingClientRect();
    const totalLen = this.root.offsetWidth;
    const clientX = Slider.clientX(e);
    return Math.max(Math.min(((clientX - rect.left) * 100) / totalLen, 100), 0);
  }

  /**
   * Calculate the value at mouse position.
   *
   * @param e
   * @return {number}
   */
  calculateMouseValue(e) {
    const {
      min: { range: minRange },
      max: { range: maxRange }
    } = this.state;

    const total = maxRange - minRange;
    const mousePos = this.calculateMousePosition(e);

    return Math.round(minRange + (total * mousePos) / 100);
  }

  /**
   * Calculate the closest step value to the value of the given prop.
   * For instance if step is 100, a value of 140 will be rounded to 100 and
   * a value of 170 will be rounded to 200 (as long as they are within min and
   * max limits).
   *
   * @param {string|number} value
   * @param {string} propName min|max
   * @return {number}
   */
  calculateClosestValue(value, propName) {
    const { step, range = [] } = this.props;

    const isMin = propName === "min";

    let prevValue;
    let nextValue;

    if (range.length === 0) {
      const min = this.state.min.range;
      const max = this.state.max.range;
      prevValue = Math.max(value - ((value - min) % step), min); // This calc gives us the prev value
      nextValue = Math.min(prevValue + step, max); // prevValue + step is the next value
    } else {
      const sorted = range.map(i => +i.value).sort((a, b) => a - b);
      prevValue = sorted.filter(i => i <= value).pop();
      nextValue = sorted.filter(i => i > value).shift();
    }

    // Make sure that the minimum distance is respected
    const { minDistance: dist } = this.props;
    const maxValue = this.state.max.value;
    const minValue = this.state.min.value;

    // Cases when max or min value are null cause an infinite loop.
    // To avoid that, always make sure that maxValue and minValue actually have values.
    // istanbul ignore else
    if (dist) {
      if (maxValue && isMin && prevValue + dist > maxValue) {
        return this.calculateClosestValue(prevValue - step, propName);
      } else if (minValue && !isMin && prevValue - dist < minValue) {
        return this.calculateClosestValue(prevValue + step, propName);
      }
    }

    return value - prevValue >= nextValue - value ? nextValue : prevValue;
  }

  /**
   * When the user drags the mouse outside the slider (on left or right extreme)
   * we reset the values if certain conditions are satisfied.
   *
   * @param {number} delta The mouse movement.
   * @param {object} rect The rect client of the dragged element.
   * @param {number} clientX The client x of the mouse.
   * @return {boolean} Returns true the state was not, false otherwise.
   */
  handleExtremes(delta, rect, clientX) {
    const { extremes, mouseThreshold } = this.props;

    if (!extremes) {
      return false;
    }

    const min = this.state.min;
    const max = this.state.max;
    const target = this.target.getAttribute("data-name");
    let state;

    if (target === "min" && delta < 0 && clientX < rect.left - mouseThreshold) {
      state = { min: { ...min, value: null, position: 0 } };
    }

    if (
      target === "max" &&
      delta > 0 &&
      clientX > rect.right + mouseThreshold
    ) {
      state = {
        max: { ...max, value: null, position: this.validateThumbPosition(100) }
      };
    }

    if (state) {
      this.setState(state, this.notifyParent(Object.keys(state)[0]));
    }

    return !!state;
  }

  /**
   * Validate the thumb positions based on the new values. This function makes sure
   * that the thumb is within 0 and 100, and also minimum is never greater than maximum.
   */
  validateThumbPosition(newP) {
    const size = this.root.offsetWidth;
    const target = this.target;
    const which = target.getAttribute("data-name");
    const isMin = which === "min";
    const thumbSize = Slider.perc(target.offsetWidth, size);

    // Make sure it is greater than 0 and lower than 100 - its width
    newP = Math.max(0, newP);
    newP = Math.min(newP, 100 - thumbSize); // Make sure it is lower than 100 - elem width.

    // Make sure they do not cross each other.
    if (isMin && newP + thumbSize > this.state.max.position) {
      newP = Math.min(newP, this.state.max.position - thumbSize);
    } else if (!isMin && newP < this.state.min.position + thumbSize) {
      newP = Math.max(newP, this.state.min.position + thumbSize);
    }

    return newP;
  }

  /**
   * Set the element which has triggered the mouse down event as the
   * element being dragged. Also this event will register the global
   * events for dragging.
   *
   * @param e
   */
  handleMouseDown(e) {
    this.clientX = Slider.clientX(e);
    this.target = e.target;
    this.target.classList.remove(classes.trans);
    this.initialPosition = parseInt(
      this.state[this.target.getAttribute("data-name")].position
    );

    // istanbul ignore else
    if (window && window.addEventListener) {
      window.addEventListener("mouseup", this.handleMouseUp);
      window.addEventListener("touchend", this.handleMouseUp);
      window.addEventListener("mousemove", this.handleMouseMove);
    }
  }

  /**
   * Calculate the closest step value when the mouse move or touch has ended.
   */
  handleMouseUp() {
    // Remove global listeners
    // istanbul ignore else
    if (window && window.removeEventListener) {
      window.removeEventListener("mouseup", this.handleMouseUp);
      window.removeEventListener("touchend", this.handleMouseUp);
      window.removeEventListener("mousemove", this.handleMouseMove);
    }

    // If extremes were set, there is no need for a correction.
    if (this.extremes) {
      return;
    }

    const elem = this.target;
    const prop = elem.getAttribute("data-name");
    const value = this.calculateClosestValue(this.state[prop].value, prop);
    elem.classList.add(classes.trans);

    this.setState(
      {
        [prop]: {
          ...this.state[prop],
          value,
          position: this.calculatePosition(value)
        }
      },
      this.notifyParent(prop)
    );
  }

  /**
   * Calculate the cursor position and set the value for the element
   * being dragged.
   *
   * @param {Object} e The event object.
   */
  handleMouseMove(e) {
    // TouchMove throws a warning for e.preventDefault
    if (e.clientX) e.preventDefault();

    const clientX = Slider.clientX(e);
    const slider = this.root;
    const rect = slider.getBoundingClientRect();
    const prop = this.target.getAttribute("data-name");
    const size = slider.offsetWidth;
    const oldP = this.initialPosition;
    const delta = clientX - this.clientX; // Number of pixels in mouse movement
    const newP = this.validateThumbPosition(oldP + Slider.perc(delta, size));

    if ((this.extremes = this.handleExtremes(delta, rect, clientX))) {
      return;
    }

    // istanbul ignore else
    if (this.state[prop].position !== newP) {
      // Do not notify the parent here as it is the duty of mouseUp callback
      this.setState({
        [prop]: {
          ...this.state[prop],
          position: newP,
          value: this.calculateMouseValue(e)
        }
      });
    }
  }

  /**
   * Return the formatted value.
   *
   * @param val
   * @return {*}
   */
  getFormattedValue(val) {
    if (Slider.isEmpty(val)) {
      return;
    }

    const { range = [], step, decimals = 2 } = this.props;

    if (range.length) {
      return (range.filter(i => +i.value === +val)[0] || {}).label;
    }

    if (step < 1) {
      return val.toFixed(decimals);
    }

    return Math.floor(val);
  }

  /**
   * Return the first non null minimum value that is provided.
   *
   * @return {Number}
   */
  getMinRange() {
    const { range = [] } = this.props;

    // Return first non null value
    if (range[0]) {
      return +range[0].value;
    }

    return +this.props.min;
  }

  /**
   * Return the first non null maximum value that is provided.
   *
   * @return {Number}
   */
  getMaxRange() {
    const { range = [] } = this.props;

    // Return first non null value
    if (range[range.length - 1]) {
      return +range[range.length - 1].value;
    }

    return +this.props.max;
  }

  /**
   * Function to render the thumbs.
   *
   * @param {string} prop minValue|maxValue
   * @return {Array}
   */
  renderThumb(prop) {
    const events = {
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleMouseDown,
      onTouchMove: this.handleMouseMove
    };

    const inputName = this.state[prop].input;
    const position =
      this.state[prop].position ||
      (prop === "max"
        ? Slider.perc(
            get(this.refs, "max.offsetWidth"),
            get(this.root, "offsetWidth")
          ) || 100
        : 0);

    const styles = { left: `${position}%` };

    return [
      <span
        className={classes.thumb}
        data-name={prop}
        style={styles}
        tabIndex={1}
        key={prop}
        ref={prop}
        {...events}
      />,
      <input
        type="hidden"
        key={`hidden-${prop}`}
        value={this.state[prop]}
        name={inputName}
      />
    ];
  }

  /**
   * Render the description part.
   */
  renderDesc() {
    const { multiple } = this.props;
    let {
      min: { value: minValue },
      max: { value: maxValue }
    } = this.state;
    let { prefix, suffix } = this.props;
    let minValueText, maxValueText;

    if (Slider.isEmpty(minValue) && Slider.isEmpty(maxValue)) {
      return this.props.placeholder;
    }

    // Formatter function
    const f = this.getFormattedValue;

    if (multiple) {
      // Join prefix and suffixes only when the value is not empty.
      minValueText = minValue
        ? [prefix[0], f(minValue), suffix[0]].filter(i => i).join(" ")
        : null;
      maxValueText = maxValue
        ? [prefix[1], f(maxValue), suffix[1]].filter(i => i).join(" ")
        : null;
    } else {
      minValueText = [prefix[0], f(minValue), suffix[0]]
        .filter(i => i)
        .join(" ");
    }

    return [
      minValueText && (
        <span key="minval" className={classes.rangeMin}>
          {minValueText}
        </span>
      ),
      multiple ? (
        <span key="maxval" className={classes.rangeMax}>
          {maxValueText}
        </span>
      ) : null
    ];
  }

  render() {
    const { multiple, label } = this.props;

    const minPos = this.state.min.position || 0;
    const maxPos = this.state.max.position || 100;
    const styles = { left: `${minPos}%`, width: `${maxPos - minPos}%` };

    if (!multiple) {
      styles.marginLeft = 0;
      styles.left = 0;
      styles.width = `${minPos}%`;
    }

    return (
      <span className={classes.slider}>
        <span className={classes.thumbBg} style={styles} />
        <span className={classes.label}>
          <span className={classes.labelText}>{label}</span>
          {this.renderDesc()}
        </span>
        <span className={classes.thumbs}>
          {this.renderThumb("min")}
          {multiple && this.renderThumb("max")}
        </span>
      </span>
    );
  }
}

export default WithWrapper(Slider);
