import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './Box.scss'

/**
 * Wrapper component for box items.
 *
 * @param className
 * @param children
 * @constructor
 */
const Wrapper = ({ className, children }) => (
  <div className={classNames(className, classes.wrapper)}>
    {children}
  </div>
)

Wrapper.propTypes = {
  className: PropTypes.oneOf([PropTypes.array, PropTypes.object, PropTypes.string]),
  children: PropTypes.node
}

export default Wrapper