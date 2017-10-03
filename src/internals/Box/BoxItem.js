import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './Box.scss'

/**
 * Display a box-looking div with content inside of it.
 *
 * @param className
 * @param children
 * @param name
 * @constructor
 */
const BoxItem = ({ className, children, name }) => (
  <div className={classNames(className, classes.item)}>
    <div className={classes.inner}>
      <div className={classes.content}>{children}</div>
      <div className={classes.desc}>{ name }</div>
    </div>
  </div>
)

BoxItem.propTypes = {
  className: PropTypes.oneOf([PropTypes.array, PropTypes.object, PropTypes.string]),
  children: PropTypes.node, // The content of the box
  name: PropTypes.string  // The name of the box (this will be displayed at the bottom of the box item)
}

export default BoxItem