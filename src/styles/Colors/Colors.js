import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import classes from './Colors.scss'
import { BoxCardWrapper, BoxCard } from 'internals/Box'

const Colors = ({ color, shades }) => {
  return (
    <BoxCardWrapper>
      {
        shades.map((shade, index) => {
          const colorClasses = classNames(classes.color, classes[`${color}-${shade}`])

          return (
            <BoxCard name={`$${color}-${shade}`} key={`colors-${index}`}>
              <div className={colorClasses} />
            </BoxCard>
          )
        })
      }
    </BoxCardWrapper>
  )
}

Colors.propTypes = {
  /**
   * @ignore
   */
  color: PropTypes.string,

  /**
   * @ignore
   */
  shades: PropTypes.array
}

export default Colors
