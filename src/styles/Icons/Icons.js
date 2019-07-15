/* global require */
import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Icons.scss";
import cn from "classnames";
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
    const { directory } = this.props;

    const classnames = cn(classes.image, {
      [classes[`icon-${directory}`]]: classes[`icon-${directory}`]
    });

    return <Icon width="75" height="75" className={classnames} />;
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
