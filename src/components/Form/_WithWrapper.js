import React, { Component } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import classes from "./Form.scss"
import { filterProps } from "../../helpers/functions"

/**
 * This is a high order component for having a wrapper around inputs.
 *
 * @param WrappedComponent
 */
export default (WrappedComponent) => {
  return class WithWrapper extends Component {
    static propTypes = {
      /**
       * The error message.
       */
      error: PropTypes.string,

      /**
       * Whether the input is inline or not.
       */
      inline: PropTypes.bool,

      /**
       * The input label.
       */
      label: PropTypes.string,

      /**
       * The children to render.
       */
      children: PropTypes.node
    }

    constructor (props) {
      super(props)

      this.state = {
        hasValue: !!this.props.value
      }

      this.handleOnChange = this.handleOnChange.bind(this)
    }

    /**
     * Update the state to track if the input has value or not.
     */
    handleOnChange (value) {
      this.setState({ hasValue: !!value })

      if (typeof this.props.onChange === "function") {
        this.props.onChange(value)
      }
    }

    render() {
      const { error, inline } = this.props
      const { hasValue } = this.state
      const injectedProps = filterProps(WithWrapper.propTypes, this.props)

      let { label } = this.props

      // In case the WrappedComponent defines a label, omit adding the label here.
      if (WrappedComponent.propTypes.label) {
        injectedProps.label = label
        label = null
      }

      // Inject a wrapper function for on change
      injectedProps.onChange = this.handleOnChange

      const wrapperClasses = classNames(classes.wrapper, {
        [classes.inline]: inline,
        [classes.hasValue]: hasValue
      })

      return (
        <span className={wrapperClasses}>
          { <WrappedComponent {...injectedProps} /> }
          { label && <span className={classes.label}>{label}</span> }
          { error && <span className={classes.error}>{error}</span> }
        </span>
      )
    }
  }
}
