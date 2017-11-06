import React, { PureComponent, cloneElement, Children } from "react"
import PropTypes from "prop-types"

export default class InputGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.node,

    onChange: PropTypes.func, // The on change callback handler
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: null,
    }

    Children.map(this.props.children, (child, index) => {
      if (child.props.checked) {
        this.state.selected = index
      }
    })
  }

  /**
   * Handle the on change.
   *
   * @param index
   * @return {function()}
   */
  handleOnChange(index) {
    return (value, props) => {
      const { onChange } = this.props

      if (typeof onChange === "function") {
        onChange(value, props)
      }

      this.setState({ selected: index })
    }
  }

  render() {
    return Children.map(this.props.children, (child, index) => (
      cloneElement(child, {
        checked: this.state.selected === index,
        onChange: this.handleOnChange(index),
      })
    ))
  }
}
