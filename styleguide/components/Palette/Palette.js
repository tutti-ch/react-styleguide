import React, { PropTypes } from 'react'
import classNames from 'classnames'

import classes from './Palette.scss'

const Palette = ({ color, shades }) => {
  return (
    <div className={classes.palette}>
      {
        shades.map((shade, index) => {
          const colorClasses = classNames(
            [classes.color],
            classes[`${color}-${shade}`]
          )

          return (
            <div className={colorClasses} key={`palette-${index}`}>
              <code className={classes.code}>${color}-{shade}</code>
            </div>
          )
        })
      }
    </div>
  )
}

Palette.propTypes = {
  color: PropTypes.string,
  shades: PropTypes.array
}

export default Palette
