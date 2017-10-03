import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './Spinner.scss'
import classNames from 'classnames'

/**
 * The spinner component creates a spinning div to indicate
 * the user that the content is loading.
 */
export default class Spinner extends Component {
  static COLOR_LIGHT = 'light'
  static COLOR_DARK = 'dark'
  static SIZE_SMALL = 2
  static SIZE_MEDIUM = 5
  static SIZE_LARGE = 8

  static propTypes = {
    /**
     * Define the color of the spinner.
     */
    color: PropTypes.oneOf([Spinner.COLOR_DARK, Spinner.COLOR_LIGHT]),

    /**
     * The size of the spinner. This will determine the thickness of the spinner.
     */
    size: PropTypes.number,

    /**
     * The additional class name that will be included to handle specific cases.
     */
    className: PropTypes.string
  }

  static defaultProps = {
    size: Spinner.SIZE_MEDIUM,
    color: Spinner.COLOR_LIGHT
  }

  constructor(props) {
    super(props)

    this.calculateStyles = this.calculateStyles.bind(this)
  }

  /**
   * Calculate the styles that will be injected to the spinner.
   */
  calculateStyles() {
    const { color, size } = this.props

    let rgba, intensity

    if (color === Spinner.COLOR_DARK) {
      rgba = 0
      intensity = 0.1
    } else {
      rgba = 255
      intensity = 0.6
    }

    const thickness = size / 10
    const border = `${thickness}rem solid rgba(${rgba}, ${rgba}, ${rgba}, ${intensity})`
    const sizeInRem = `${size}rem`

    return {
      width: sizeInRem,
      height: sizeInRem,
      borderTop: border,
      borderRight: border,
      borderBottom: border,
      borderLeft: `${thickness}rem solid rgba(${rgba}, ${rgba}, ${rgba}, ${Math.round((intensity + 0.2) * 100) / 100})`
    }
  }

  /**
   * Render the spinner.
   */
  render() {
    const { className } = this.props
    const styles = this.calculateStyles()

    return (
      <div className={classNames(classes.wrapper, className)}>
        <div className={classes.spinner} style={styles}/>
      </div>
    )
  }
}
