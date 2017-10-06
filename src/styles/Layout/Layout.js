import React from 'react'
import classes from '../style-guide.scss'

const smallerBreakpoints = {
  'phone-and-smaller': 319,
  'phablet-and-smaller': 480,
  'tablet-and-smaller': 800,
  'laptop-and-smaller': 994,
  'desktop-and-smaller': 1364
}

const biggerBreakpoints = {
  'phone-and-bigger': 319,
  'phablet-and-bigger': 480,
  'tablet-and-bigger': 800,
  'laptop-and-bigger': 994,
  'desktop-and-bigger': 1364
}


const Layout = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        {
          Object.keys(smallerBreakpoints).map(key => (
            <div className={classes.row} key={`size-${key}`}>
              <span className={classes.label}>{key}</span>
              <span className={classes.value}>From 0</span>
              <span className={classes.value}>to {smallerBreakpoints[key]} px</span>
            </div>
          ))
        }
      </div>
      <div className={classes.block}>
        {
          Object.keys(biggerBreakpoints).map(key => (
            <div className={classes.row} key={`size-${key}`}>
              <span className={classes.label}>{key}</span>
              <span className={classes.value}>From {biggerBreakpoints[key]} px</span>
              <span className={classes.value}>to infinity</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Layout
