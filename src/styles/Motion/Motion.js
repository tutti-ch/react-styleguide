import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './Motion.scss'
import classNames from 'classnames'
import { BoxItemWrapper, BoxItem } from 'internals/Box'

export default class Motion extends Component {
  static propTypes = {
    render: PropTypes.oneOf(['transition', 'animation'])
  }

  renderTransition () {
    return (
      <BoxItemWrapper>
        <BoxItem label='Transition S' >
          <div className={classNames(classes.transitionSample, classes.transitionS)}></div>
        </BoxItem>
        <BoxItem label='Transition M'>
          <div className={classNames(classes.transitionSample, classes.transitionM)}></div>
        </BoxItem>
        <BoxItem label='Transition L'>
          <div className={classNames(classes.transitionSample, classes.transitionL)}></div>
        </BoxItem>
      </BoxItemWrapper>
    )
  }

  renderAnimation () {
    return (
      <BoxItemWrapper>
        <BoxItem label='Animation Shake' >
          <div className={classNames(classes.animationSample, classes.animationShake)}></div>
        </BoxItem>
      </BoxItemWrapper>
    )
  }

  render () {
    if (this.props.render === 'animation') {
      return this.renderAnimation()
    } else {
      return this.renderTransition()
    }
  }
}
