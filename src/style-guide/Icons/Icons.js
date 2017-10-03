/* global require */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from './Icons.scss'
import { BoxWrapper, BoxItem } from 'internals/Box'

export default class Icons extends Component {
  static propTypes = {
    /**
     * The directory name to load icons from.
     *
     * @ignore
     */
    directory: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.getIconList = this.getIconList.bind(this)
  }

  /**
   * Return the icon list from the given directory name.
   */
  getIconList() {
    return require('../../assets/icons/' + this.props.directory + '/index.js')
  }

  render() {
    const icons = this.getIconList()

    return (
      <BoxWrapper>
        {Object.keys(icons).map((icon, index) => (
          <BoxItem key={`asset-${index}`} name={icon}>
            <img className={classes.image} src={icons[icon]} width='75' height='75'/>
          </BoxItem>
        ))}
      </BoxWrapper>
    )
  }
}
