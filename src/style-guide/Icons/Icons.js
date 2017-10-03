import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from './Icons.scss'
import styleGuide from '../style-guide.scss'

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
      <div className={styleGuide.wrapper}>
        {Object.keys(icons).map((icon, index) => (
          <div className={classes.icon} key={`asset-${index}`}>
            <img className={classes.image} src={icons[icon]} width='75' height='75'/>
            <code className={classes.name}>{icon}</code>
          </div>
        ))}
      </div>
    )
  }
}
