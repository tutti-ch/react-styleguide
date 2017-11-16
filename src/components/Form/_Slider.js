import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import WithWrapper from "./_WithWrapper";
import classes from "./Form.scss";


export class Slider extends Component {
  static defaultProps = {
    template: "",
    minDistance: 10,
    prefix: "",
    suffix: "",
    crossThumbs: false,
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
     * The minumum range in pixels between the two thumbs. This will only
     * work when crossThumbs is false. By default it works.
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
     * Whether min and max thumbs can cross and change positions.
     */
    crossThumbs: PropTypes.bool,

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
    mouseThreshold: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);
    this.calculateMousePosition = this.calculateMousePosition.bind(this);
    this.calculateClosestValue = this.calculateClosestValue.bind(this);
    this.getFormattedValue = this.getFormattedValue.bind(this);
    this.getRangeIndex = this.getRangeIndex.bind(this);
    this.getMaxRange = this.getMaxRange.bind(this);
    this.getMinRange = this.getMinRange.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
    this.renderDesc = this.renderDesc.bind(this);

    this.state = {
      min: {
        range: this.getMinRange(),
        input: Array.isArray(props.name) ? props.name[0] : props.name,
        value: parseInt(props.values[0])
      },
      max: {
        range: this.getMaxRange(),
        input: Array.isArray(props.name) ? props.name[1] : props.name,
        value: parseInt(props.values[1])
      },
      prefix: Array.isArray(props.prefix)
        ? props.prefix
        : [props.prefix, props.prefix],
      suffix: Array.isArray(props.suffix)
        ? props.suffix
        : [props.suffix, props.suffix],
      dragging: false // The element we are currently dragging.
    };

    this.state.min.position = this.calculatePosition(this.state.min.value) || 0;
    this.state.max.position =
      this.calculatePosition(this.state.max.value) || 100;
  }

  /**
   * Register the root component here to save some operations later.
   */
  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps({ name }) {
    const state = {};

    if (name !== this.props.name) {
      state.min = {
        ...this.state.min,
        input: Array.isArray(name) ? name[0] : name
      };
      state.max = {
        ...this.state.max,
        input: Array.isArray(name) ? name[1] : name
      };
    }

    if (Object.keys(state).length) {
      this.setState(state);
    }
  }

  /**
   * Given a value, calculate the position in percentage.
   *
   * @param {number} value
   * @return {number|null} Returns null in case value is also empty.
   */
  calculatePosition(value) {
    if (value === null) return null;

    const minRange = this.state.min.range;
    const maxRange = this.state.max.range;

    if (value === minRange) return 0;
    if (value === maxRange) return 100;

    const total = maxRange - minRange;
    const distance = value - minRange;

    return distance * 100 / total;
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
    return Math.max(Math.min((clientX - rect.left) * 100 / totalLen, 100), 0);
  }

  /**
   * Return the clientX value of the event.
   *
   * @param e
   * @return {*}
   */
  static clientX(e) {
    if (e.clientX) return e.clientX;
    if (e.touches && e.touches[0]) return e.touches[0].clientX;
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
   * Calculate the closest step value to the value of the given prop.
   * For instance if step is 100, a value of 140 will be rounded to 100 and
   * a value of 170 will be rounded to 200 (as long as they are within min and
   * max limits).
   *
   * @param {string|number} value
   * @return {number}
   */
  calculateClosestValue(value) {
    const { step, range = [] } = this.props;

    let prevValue;
    let nextValue;

    if (range.length === 0) {
      const min = this.state.min.range;
      const max = this.state.max.range;
      prevValue = Math.max(value - (value - min) % step, min); // This calc gives us the prev value
      nextValue = Math.min(prevValue + step, max); // prevValue + step is the next value
    } else {
      const sorted = range.map(i => +i.value).sort((a, b) => a - b);
      prevValue = sorted.filter(i => i <= value).pop();
      nextValue = sorted.filter(i => i > value).shift();
    }

    if (this.direction === "R") {
      return value - prevValue >= nextValue - value ? nextValue : prevValue;
    } else {
      return value - prevValue > nextValue - value ? nextValue : prevValue;
    }
  }

  /**
   * Set the element which has triggered the mouse down event as the
   * element being dragged. Also this event will register the global
   * events for dragging.
   *
   * @param e
   */
  handleMouseDown(e) {
    this.setState({ dragging: e.target });
    this.clientX = Slider.clientX(e);

    e.target.classList.remove(classes.trans);

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

    const { dragging: elem } = this.state;
    const prop = elem.getAttribute("name");
    elem.classList.add(classes.trans);

    const value = this.calculateClosestValue(this.state[prop].value);
    const state = this.state[prop];

    this.setState(
      {
        dragging: false,
        [prop]: { ...state, value, position: this.calculatePosition(value) }
      },
      () => {
        if (typeof this.props.onChange === "function") {
          this.props.onChange(this.state[prop].value, {
            name: this.state[prop].input,
            initialValue: this.props.values[prop === "min" ? 0 : 1]
          });
        }
      }
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

    // Limits of the slider (minimum and maximum value) and the thumb that is being dragged
    const {
      dragging: elem,
      min: { range: minRange },
      max: { range: maxRange }
    } = this.state;
    const { minDistance, crossThumbs, values, extremes, mouseThreshold } = this.props;

    const prop = elem.getAttribute("name");
    const rect = elem.getBoundingClientRect();
    const isMin = prop === "min";
    const clientX = Slider.clientX(e);
    const mousePos = this.calculateMousePosition(e); // The mouse position in percentage
    const mouseValue = Math.round(
      minRange + (maxRange - minRange) * mousePos / 100
    ); // The value at the mouse position

    // If the mouse position is in the left or right extreme, reset the values (only if initials values are null)
    if (
      isMin &&
      (values[0] === null || extremes) &&
      clientX < rect.left - mouseThreshold
    ) {
      return this.setState({
        min: { ...this.state.min, value: null, position: 0 }
      });
    }

    if (
      !isMin &&
      (values[1] === null || extremes) &&
      clientX > rect.right + mouseThreshold
    ) {
      return this.setState({
        max: { ...this.state.max, value: null, position: 100 }
      });
    }

    // Save the direction so that the calculatePosition
    // function can compute properly
    this.direction = this.clientX < Slider.clientX(e) ? "R" : "L";

    // If cross thumbs is not allowed, make sure that min never passes max thumb.
    if (crossThumbs !== true) {
      const minValue = isMin ? mouseValue : this.state.min.value;
      const maxValue = !isMin ? mouseValue : this.state.max.value;

      if (minValue + minDistance > maxValue) {
        return;
      }
    }

    if (mouseValue >= minRange && mouseValue <= maxRange) {
      const state = {
        ...this.state[prop],
        value: mouseValue,
        position: mousePos
      };

      this.setState({ [prop]: state });
    }
  }

  /**
   * Return the index of the given value in the range.
   *
   * @param value
   * @return {number}
   */
  getRangeIndex(value) {
    const { range = [] } = this.props;

    for (let i = 0; i < range.length; i++) {
      if (+range[i].value === +value) {
        return i;
      }
    }

    return -1;
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
    const position = this.state[prop].position;
    const styles = { left: `${position}%` };

    return [
      <span
        className={classes.thumb}
        name={prop}
        style={styles}
        tabIndex={1}
        key={prop}
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
    const { multiple, crossThumbs } = this.props;
    let { min: { value: minValue }, max: { value: maxValue } } = this.state;
    let { prefix, suffix } = this.props;
    let minValueText, maxValueText;

    if (Slider.isEmpty(minValue) && Slider.isEmpty(maxValue)) {
      return this.props.placeholder;
    }

    // Formatter function
    const f = this.getFormattedValue;

    if (multiple) {
      // If crossThumbs is enabled, check for the min value (min and max can be swapped)
      // Otherwise, minValue is always minValue. Do not need to swap here.
      const min = !crossThumbs
        ? minValue
        : minValue < maxValue ? minValue : maxValue;
      const max = !crossThumbs
        ? maxValue
        : maxValue > minValue ? maxValue : minValue;

      // Join prefix and suffixes only when the value is not empty.
      minValueText = min
        ? [prefix[0], f(min), suffix[0]].filter(i => i).join(" ")
        : null;
      maxValueText = max
        ? [prefix[1], f(max), suffix[1]].filter(i => i).join(" ")
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

    return (
      <span className={classes.slider}>
        <span className={classes.label}>
          <span className={classes.labelText}>{label}</span>
          {this.renderDesc()}
        </span>
        {this.renderThumb("min")}
        {multiple && this.renderThumb("max")}
      </span>
    );
  }
}

export default WithWrapper(Slider);
