import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './Borders.scss'
import classNames from 'classnames'
import { BoxItemWrapper, BoxItem } from 'internals/Box'

export default class Borders extends Component {
  static propTypes = {
    render: PropTypes.oneOf(['width', 'radius'])
  }

  renderWidth () {
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

  renderRadius () {
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

  render () {
    if (this.props.render === 'radius') {
      return this.renderRadius()
    } else {
      return this.renderWidth()
    }
  }
}
