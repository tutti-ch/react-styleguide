import React, { Component } from "react"
import PropTypes from "prop-types"
import { filterProps } from "helpers/functions"
import WithWrapper from "./_WithWrapper"

export class Input extends Component {
  static defaultProps = {
    value: "",
    type: "text"
  }

  static propTypes = {
    /**
     * The initial value.
     */
    value: PropTypes.string,

    /**
     * The input type.
     */
    type: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Sync the value.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  /**
   * Handle the change event.
   */
  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      if (typeof this.props.onChange === "function") {
        this.props.onChange(this.state.value)
      }
    })
  }

  render() {
    const { value } = this.state
    const { type } = this.props
    const props = filterProps(Input.propTypes, this.props)

    return <input
      {...props}
      type={type}
      value={value}
      onChange={this.handleChange}
    />
  }
}

export default WithWrapper(Input)
