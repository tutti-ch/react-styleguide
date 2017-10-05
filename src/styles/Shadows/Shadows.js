import React from 'react'
import classNames from 'classnames'
import classes from './Shadows.scss'
import styleGuide from '../styleGuide.scss'
import { BoxItemWrapper, BoxItem } from 'internals/Box'

const Shadows = () => {
  return (
    <BoxItemWrapper>
      <BoxItem label='Light Shadow' >
        <div className={classNames(classes.shadowSample, classes.shadowS)}></div>
      </BoxItem>
      <BoxItem label='Medium Shadow'>
        <div className={classNames(classes.shadowSample, classes.shadowM)}></div>
      </BoxItem>
      <BoxItem label='Light Top Shadow' >
      <div className={classNames(classes.shadowSample, classes.shadowTopS)}></div>
      </BoxItem>
      <BoxItem label='Medium Top Shadow'>
        <div className={classNames(classes.shadowSample, classes.shadowTopM)}></div>
      </BoxItem>
    </BoxItemWrapper>
  )
}

export default Shadows
