import React from 'react'
import classes from './Sizes.scss'

const Sizes = () => {
  return (
    <div>
      <span className={classes.sizeXxxs}>size-xxxs: 0.25rem; (4px)</span>
      <span className={classes.sizeXxs}>size-xxs: 0.5rem; (8px)</span>
      <span className={classes.sizeXs}>size-xs: 0.75rem; (12px)</span>
      <span className={classes.sizeS}>size-s: 0.875rem; (14px)</span>
      <span className={classes.sizeM}>size-m: 1rem; (16px)</span>
      <span className={classes.sizeL}>size-l: 1.5rem; (24px)</span>
      <span className={classes.sizeXl}>size-xl: 2rem; (32px)</span>
      <span className={classes.sizeXxl}>size-xxl: 2.5rem; (40px)</span>
      <span className={classes.sizeXxxl}>size-xxxl: 3rem; (48px)</span>
    </div>
  )
}

export default Sizes
