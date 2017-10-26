import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import WithWrapper from "./_WithWrapper"
import classes from "./Form.scss"

export class Slider extends Component {
  static defaultProps = {
    template: "",
    minRange: 100,
    prefix: "",
    suffix: "",
    crossThumbs: false,
  }

  static propTypes = {
    /**
     * The minimum range.
     */
    min: PropTypes.number.isRequired,

    /**
     * The maximum range.
     */
    max: PropTypes.number.isRequired,

    /**
     * The current minimum value.
     */
    minValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The current maximum value.
     */
    maxValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The minumum range in pixels between the two thumbs. This will only
     * work when crossThumbs is false. By default it works.
     */
    minRange: PropTypes.number,

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
  }

  constructor(props) {
    super(props)

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.calculatePosition = this.calculatePosition.bind(this)
    this.calculateMousePosition = this.calculateMousePosition.bind(this)
    this.calculateClosestValue = this.calculateClosestValue.bind(this)
    this.renderThumb = this.renderThumb.bind(this)

    this.state = {
      minValue: props.minValue || props.min,
      maxValue: props.maxValue || props.max,
      dragging: false // The element we are currently dragging.
    }
  }

  /**
   * Register the root component here to save some operations later.
   */
  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this)
  }

  /**
   * Given a value, calculate the position in percentage.
   *
   * @param {number} value
   * @return {number}
   */
  calculatePosition(value) {
    const { min, max } = this.props

    if (value === min) return 0
    if (value === max) return 100

    const total = max - min
    const distance = value - min

    return distance * 100 / total
  }

  /**
   * Calculate the mouse position in percentage. This function supports also
   * touch events.
   *
   * @param {Object} e The mouse event.
   * @return {number}
   */
  calculateMousePosition(e) {
    const rect = this.root.getBoundingClientRect()
    const totalLen = this.root.offsetWidth
    const clientX = (e.clientX || e.touches[0].clientX)

    return ((clientX - rect.left) * 100) / totalLen
  }

  /**
   * Calculate the closest step value to the value of the given prop.
   * For instance if step is 100, a value of 140 will be rounded to 100 and
   * a value of 170 will be rounded to 200 (as long as they are within min and
   * max limits).
   *
   * @param {string} prop minValue|maxValue
   * @return {number}
   */
  calculateClosestValue(prop) {
    const { min, max, step } = this.props
    const value = this.state[prop]
    const mod = value % step

    // The math functions make sure that the values are always between min and max
    if (mod >= step / 2) {
      return Math.max(Math.min(value + step - mod, max), min)
    } else {
      return Math.min(Math.max(value - mod, min), max)
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
    this.setState({ dragging: e.target })
    e.target.classList.remove(classes.trans)

    // istanbul ignore else
    if (window && window.addEventListener) {
      window.addEventListener("mouseup", this.handleMouseUp)
      window.addEventListener("touchend", this.handleMouseUp)
      window.addEventListener("mousemove", this.handleMouseMove)
    }
  }

  /**
   * Calculate the closest step value when the mouse move or touch has ended.
   */
  handleMouseUp() {
    // Remove global listeners
    // istanbul ignore else
    if (window && window.removeEventListener) {
      window.removeEventListener("mouseup", this.handleMouseUp)
      window.removeEventListener("touchend", this.handleMouseUp)
      window.removeEventListener("mousemove", this.handleMouseMove)
    }

    const elem = this.state.dragging
    const prop = elem.getAttribute("name")
    this.setState({ dragging: false })
    elem.classList.add(classes.trans)

    this.setState({ [prop]: this.calculateClosestValue(prop) })
  }

  /**
   * Calculate the cursor position and set the value for the element
   * being dragged.
   *
   * @param {Object} e The event object.
   */
  handleMouseMove(e) {
    const { dragging: elem } = this.state
    const { min, max, minRange, crossThumbs } = this.props

    // TouchMove throws a warning for e.preventDefault
    if (e.clientX) e.preventDefault()

    const prop = elem.getAttribute("name")
    const mousePos = this.calculateMousePosition(e)
    const mouseValue = min + ((max - min) * mousePos / 100) // The value at the mouse position

    // If cross thumbs is not allowed, make
    // sure that min never passes max thumb.
    if (crossThumbs !== true) {
      const minValue = prop === "minValue" ? mouseValue : this.state.minValue
      const maxValue = prop === "maxValue" ? mouseValue : this.state.maxValue

      if (minValue + minRange > maxValue) {
        return
      }
    }

    if (mouseValue >= min && mouseValue <= max) {
      this.setState({ [prop]: mouseValue })
    }
  }

  /**
   * Function to render the thumbs.
   *
   * @param {string} prop minValue|maxValue
   * @return {XML}
   */
  renderThumb(prop) {
    const events = {
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleMouseDown,
      onTouchMove: this.handleMouseMove,
    }

    const position = this.calculatePosition(this.state[prop])
    const styles = { left: `${position}%` }

    return (
      <span className={classes.thumb} name={prop} style={styles} {...events} tabIndex={1}/>
    )
  }

  render() {
    const { multiple, label } = this.props
    const { minValue, maxValue } = this.state
    let { prefix, suffix } = this.props

    if (Array.isArray(prefix) === false) prefix = [prefix, prefix]
    if (Array.isArray(suffix) === false) suffix = [suffix, suffix]

    const minValueText = prefix[0] + `${Math.floor(Math.min(minValue, maxValue))}` + suffix[0]
    const maxValueText = prefix[1] + `${Math.floor(Math.max(minValue, maxValue))}` + suffix[1]

    return (
      <span className={classes.slider}>
        <span className={classes.label}>
          <span className={classes.labelText}>{label}</span>
          <span className={classes.rangeMin}>{minValueText}</span>
          { multiple && <span className={classes.rangeMax}>{maxValueText}</span> }
        </span>
        { this.renderThumb("minValue") }
        { multiple && this.renderThumb("maxValue")}
      </span>
    )
  }
}

export default WithWrapper(Slider)
