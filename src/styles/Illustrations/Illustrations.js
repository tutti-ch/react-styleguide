/* global require */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from './Illustrations.scss'
import { BoxItemWrapper, BoxItem } from 'internals/Box'

export default class Illustrations extends Component {
  static propTypes = {
    /**
     * The directory name to load illustrations from.
     *
     * @ignore
     */
    directory: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.getIllustrationList = this.getIllustrationList.bind(this)
  }

  /**
   * Return the Illustration list from the given directory name.
   */
  getIllustrationList() {
    return require('./assets/' + this.props.directory + '/index.js')
  }

  render() {
    const illustrations = this.getIllustrationList()

    return (
      <BoxItemWrapper>
        {Object.keys(illustrations).map((illustration, index) => (
          <BoxItem key={`asset-${index}`} name={illustration}>
            <img className={classes.image} src={illustrations[illustration]} width='75' height='75'/>
          </BoxItem>
        ))}
      </BoxItemWrapper>
    )
  }
}
