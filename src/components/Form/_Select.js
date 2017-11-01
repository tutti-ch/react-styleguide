import React, { Component } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import classes from "./Form.scss"
import isEqual from "lodash.isequal"
import Option from "./_SelectOption"
import OutsideClickable from "../OutsideClickable"
import WithWrapper from "./_WithWrapper"

export class Select extends Component {
  static propTypes = {
    /**
     * The selected value. Can either be an array of selected values, or a simple value.
     */
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),

    /**
     * Either an object of key-values or an array of objects with key and value properties or
     * an array of values (in this case key will also be value).
     */
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,

    /**
     * Whether multiple choice is possible or not.
     */
    multiple: PropTypes.bool,

    /**
     * Whether the option keys should be sorted or not.
     */
    sort: PropTypes.bool,

    /**
     * Whether the input is disabled or not.
     */
    disabled: PropTypes.bool,

    /**
     * The class name to pass to the select input.
     */
    className: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
      PropTypes.object,
    ]),

    /**
     * The size of the input.
     */
    size: PropTypes.oneOf(["small", "medium"]),

    /**
     * The placeholder value to display when none of the options is selected.
     */
    placeholder: PropTypes.string,

    /**
     * The input name.
     */
    name: PropTypes.string,
  }

  static defaultProps = {
    multiple: false,
    size: "medium",
  }

  constructor(props) {
    super(props)

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.toggle = this.toggle.bind(this)
    this.select = this.select.bind(this)
    this.unselect = this.unselect.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.getSelectedOptions = this.getSelectedOptions.bind(this)

    const options = props.sort ? this.sortOptions(props.options) : props.options
    const selected = Array.isArray(props.selected) ? props.selected : [props.selected]

    this.state = {
      highlighted: this.findIndexByValue(selected[0]),
      isOpen: false,
      options: options.filter(i => i).map(i => ({ ...i, value: i.value.toString() })),
      selected: selected.filter(i => i).map(i => i.toString()),
    }
  }

  /**
   * Update the state when parent updates the value.
   *
   * @param selected
   * @param sort
   * @param options
   */
  componentWillReceiveProps({ selected, options, sort }) {
    const state = {}

    // Update the selected value
    if (isEqual(selected, this.props.selected) === false) {
      state.selected = Array.isArray(selected) ? selected : [selected]
      state.selected = state.selected.map(i => i.toString())
    }

    // Re-sort options if the order has been changed
    if (isEqual(options, this.props.options) === false) {
      options = options.map(i => ({ ...i, value: i.value.toString() }))
      state.options = sort ? this.sortOptions(options) : options
    }

    if (Object.keys(state).length) {
      this.setState(state)
    }
  }

  /**
   * Gets fired when user presses down key
   *
   * @memberof Select
   */
  handleArrowDown() {
    let { highlighted } = this.state
    const next = highlighted + 1

    // if we're already over the limit, don't shift select
    if (next >= this.props.options.length) {
      return
    }

    this.setState({ highlighted: next }, () => {
      this.optionsDiv.scrollTop = this.optionsDiv.children[next].offsetTop
    })
  }

  /**
   * Gets fired when user presses up key
   *
   * @memberof Select
   */
  handleArrowUp() {
    let { highlighted } = this.state
    const prev = highlighted - 1

    // if we're already over the limit, don't shift select
    if (prev < 0) {
      return
    }

    this.setState({ highlighted: prev }, () => {
      this.optionsDiv.scrollTop = this.optionsDiv.children[prev].offsetTop
    })
  }

  /**
   * Handle keypresses when a dropdown is focused
   *
   * @memberof Select
   */
  keyDown(event) {
    const { highlighted, isOpen } = this.state

    if (["ArrowDown", "Down", "ArrowUp", "Up", "Enter", " "].indexOf(event.key) > -1) {
      event.preventDefault()

      if (!isOpen) {
        return this.open()
      }
    }

    switch (event.key) {
      case "ArrowDown":
      case "Down":
        return this.handleArrowDown()
      case "ArrowUp":
      case "Up":
        return this.handleArrowUp()
      case "Enter":
      case " ":
        return this.select(this.props.options[highlighted])
      case "Escape":
      case "Esc":
        event.preventDefault()
        return this.close()
    }
  }

  /**
   * Display the options.
   */
  open() {
    if (this.props.disabled) {
      return
    }

    this.setState({
      isOpen: true,
    })
  }

  close() {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      })
    }
  }

  toggle() {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  findIndexByValue(value) {
    const { options } = this.props

    if (value) {
      for (let key = 0; key < options.length; key++) {
        if (options[key].value.toString() === value) {
          return key
        }
      }
    }

    return -1
  }

  /**
   * Select and highlight the given item.
   *
   * @param value
   * @param {*} event
   */
  select({ value }, event) {
    const { multiple } = this.props

    let selected = [value]

    // Add support for multiple selections
    if (multiple) {
      // Do not propagate when multi box is open
      event.stopPropagation()

      // If the item is already there unselect it otherwise add it.
      selected = this.state.selected.slice(0)
      const index = selected.indexOf(value)
      index > -1 ? selected.splice(index, 1) : selected.push(value)
    }

    this.setState({ selected, highlighted: this.findIndexByValue(value) }, () => {
      if (typeof this.props.onChange === "function") {
        this.props.onChange(`${value}`)
      }
    })
  }

  /**
   * Unselect the given value.
   *
   * @param value
   * @param {*} event
   */
  unselect({ value }, event) {
    event.preventDefault()
    event.stopPropagation()

    const selected = this.state.selected.slice(0)
    const index = selected.indexOf(value)

    if (index > -1) {
      selected.splice(index, 1)
      this.setState({ selected })
    }
  }

  /**
   * Sort the given options in alphanumeric order.
   *
   * @param options
   * @return {*|Array.<T>|void}
   */
  sortOptions(options) {
    return options.sort((a, b) => {
      const nameA = a.text.toUpperCase()
      const nameB = b.text.toUpperCase()
      if (nameA < nameB) return -1

      // istanbul ignore else
      if (nameA > nameB) return 1

      // istanbul ignore next
      return 0
    })
  }

  /**
   * Attach an event handler to the document to catch the key strokes.
   */
  handleOnFocus() {
    // istanbul ignore else
    if (document) {
      document.addEventListener("keydown", this.keyDown)
    }
  }

  /**
   * Detach the keydown event handler from the document.
   */
  handleOnBlur() {
    // istanbul ignore else
    if (document) {
      document.removeEventListener("keydown", this.keyDown)
    }
  }

  /**
   * Return the selected option, or the placeholder if provided.
   *
   * @return {*}
   */
  getSelectedOptions() {
    const { options, placeholder } = this.props
    const { selected } = this.state
    const selectedOpts = options.filter(o => selected.indexOf(o.value) > -1)

    if (selectedOpts.length === 0 && placeholder) {
      selectedOpts.push({ text: placeholder, value: null, })
    }

    return selectedOpts
  }

  render() {
    const { disabled, placeholder, multiple, name } = this.props
    const { highlighted, isOpen, options, selected: selectedValues } = this.state

    const selectClasses = classNames(classes.select, {
      [classes.multiple]: multiple,
      [classes.isOpen]: isOpen,
      [classes.disabled]: disabled,
      [classes.placeholder]: placeholder && selectedValues.length === 0,
    })

    return (
      <OutsideClickable onOutsideClick={this.close}>
        <input type="hidden" name={name} value={selectedValues.join(",")} />
        <div className={selectClasses} onClick={this.toggle}>
          <div
            className={classNames(classes.selectInner)}
            tabIndex={0}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
          >
            <div className={classNames(classes.ph)}>
              {
                this.getSelectedOptions().map(o => (
                  <Option
                    text={o.text}
                    icon={o.icon}
                    image={o.image}
                    value={o.value}
                    key={o.value}
                    onClick={multiple && o.value ? this.unselect : undefined}
                  />
                ))
              }
            </div>

            <div
              className={classNames(classes.options)}
              ref={r => {
                this.optionsDiv = r
              }}
            >
              {options.map(({ value, icon, image, text }, key) => {
                return (
                  <Option
                    onClick={this.select}
                    icon={icon}
                    image={image}
                    text={text}
                    value={value}
                    selected={selectedValues.indexOf(value) > -1}
                    highlighted={highlighted === key}
                    key={value}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </OutsideClickable>
    )
  }
}

export default WithWrapper(Select, { className: classes.selectWrapper })
