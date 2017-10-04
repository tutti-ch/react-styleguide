import React from 'react'
import classes from './Borders.scss'
import classNames from 'classnames'
import { BoxItemWrapper, BoxItem } from 'internals/Box'

const BorderRadius = () => {
  return (
    <BoxItemWrapper>
      <BoxItem label='Border Radius S - 3px' >
        <div className={classNames(classes.borderRadiusSample, classes.borderRadiusS)}></div>
      </BoxItem>
      <BoxItem label='Border Radius M - 6px'>
        <div className={classNames(classes.borderRadiusSample, classes.borderRadiusM)}></div>
      </BoxItem>
      <BoxItem label='Border Radius L - 9px'>
        <div className={classNames(classes.borderRadiusSample, classes.borderRadiusL)}></div>
      </BoxItem>
    </BoxItemWrapper>
  )
}

export default BorderRadius