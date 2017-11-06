import React, { Component } from "react"
import PropTypes from "prop-types"
import { filterProps } from "../../helpers/functions"
import WithWrapper from "./_WithWrapper"

export class Textarea extends Component {
  static defaultProps = {
    value: "",
  }

  static propTypes = {
    /**
     * The initial value.
     */
    value: PropTypes.string,

    /**
     * The input name.
     */
    name: PropTypes.string,
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
        const { name, value } = this.props
        this.props.onChange(this.state.value, { name, initialValue: value })
      }
    })
  }

  render() {
    const { value } = this.state
    const { name } = this.props
    const props = filterProps(Textarea.propTypes, this.props)

    return <textarea {...props} name={name} value={value} onChange={this.handleChange}/>
  }
}

export default WithWrapper(Textarea)
