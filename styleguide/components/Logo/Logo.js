import React from 'react'
import TuttiLogo from './assets/logo.svg'
import classes from './Logo.scss'

const Logo = () => {
  return (
      <img className={classes.logoBox} src={TuttiLogo} alt='tutti.ch logo' />
  )
}

export default Logo
