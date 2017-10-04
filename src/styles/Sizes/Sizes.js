import React from 'react'
import classNames from 'classnames'
import classes from './Sizes.scss'
import styleGuide from '../styleGuide.scss'

const sizes = {
  'size-xxxs': [0.25, 4],
  'size-xxs': [0.50, 8],
  'size-xs': [0.75, 12],
  'size-s': [0.875, 14],
  'size-m': [1, 16],
  'size-ml': [1.25, 20],
  'size-l': [1.5, 24],
  'size-xl': [2, 32],
  'size-xxl': [2.5, 40],
  'size-xxxl': [3, 48]
}

const Sizes = () => {
  return (
    <div className={styleGuide.wrapper}>
      {
        Object.keys(sizes).map(key => (
          <div className={classes.row} key={`size-${key}`}>
            <span className={classes.label}>{key}</span>
            <span className={classNames(classes.value, classes[key])}>{sizes[key][0]}rem</span>
            <span className={classNames(classes.value, classes[key])}>{sizes[key][1]}px</span>
          </div>
        ))
      }
    </div>
  )
}

export default Sizes
