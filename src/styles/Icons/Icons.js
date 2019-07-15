/* global require */
import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Icons.scss";
import { BoxCardWrapper, BoxCard } from "../../internals/Box";

export default class Icons extends Component {
  static propTypes = {
    /**
     * The directory name to load icons from.
     *
     * @ignore
     */
    directory: PropTypes.string
  };

  /**
   * Return the icon list from the given directory name.
   */
  getIconList = () => {
    return require("./assets/" + this.props.directory + "/index.js");
  };

  renderIcon = (icons, icon) => {
    const Icon = icons[icon];
    return <Icon width="75" height="75" className={classes.image} />;
  };

  render() {
    const icons = this.getIconList();

    return (
      <BoxCardWrapper className={classes.wrapper}>
        {Object.keys(icons)
          .sort()
          .map((icon, index) => (
            <BoxCard key={`asset-${index}`} name={icon}>
              {this.renderIcon(icons, icon)}
            </BoxCard>
          ))}
      </BoxCardWrapper>
    );
  }
}
