import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './Box.scss'

/**
 * BoxItemWrapper component for box items.
 *
 * @param className
 * @param children
 * @constructor
 */
const BoxItemWrapper = ({ className, children }) => (
  <div className={classNames(className, classes.wrapper, classes.BoxItemWrapper)}>
    {children}
  </div>
)

BoxItemWrapper.propTypes = {
  className: PropTypes.oneOf([PropTypes.array, PropTypes.object, PropTypes.string]),
  children: PropTypes.node
}

export default BoxItemWrapper