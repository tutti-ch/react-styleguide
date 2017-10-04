import React from 'react'
import classes from './Borders.scss'
import classNames from 'classnames'
import { BoxItemWrapper, BoxItem } from 'internals/Box'

const BorderWidth = () => {
  return (
    <BoxItemWrapper>
      <BoxItem label='Border S - 1px' >
        <div className={classNames(classes.borderSample, classes.borderS)}></div>
      </BoxItem>
      <BoxItem label='Border M - 2px'>
        <div className={classNames(classes.borderSample, classes.borderM)}></div>
      </BoxItem>
      <BoxItem label='Border L - 3px'>
        <div className={classNames(classes.borderSample, classes.borderL)}></div>
      </BoxItem>
    </BoxItemWrapper>
  )
}

export default BorderWidth