import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import classes from './Palette.scss'
import { BoxWrapper, BoxItem } from 'internals/Box'

const Palette = ({ color, shades }) => {
  return (
    <BoxWrapper>
      {
        shades.map((shade, index) => {
          const colorClasses = classNames(classes.color, classes[`${color}-${shade}`])

          return (
            <BoxItem name={`$${color}-${shade}`} key={`palette-${index}`}>
              <div className={colorClasses} />
            </BoxItem>
          )
        })
      }
    </BoxWrapper>
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
