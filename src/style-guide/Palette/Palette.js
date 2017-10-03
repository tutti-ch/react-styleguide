import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import classes from './Palette.scss'
import styleGuide from '../style-guide.scss'

const Palette = ({ color, shades }) => {
  return (
    <div className={styleGuide.wrapper}>
      {
        shades.map((shade, index) => {
          const colorClasses = classNames(classes.color, classes[`${color}-${shade}`])

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
  /**
   * @ignore
   */
  color: PropTypes.string,

  /**
   * @ignore
   */
  shades: PropTypes.array
}

export default Palette
