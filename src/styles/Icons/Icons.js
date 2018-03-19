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

  constructor(props) {
    super(props);

    this.getIconList = this.getIconList.bind(this);
    this.toIconName = this.toIconName.bind(this);
  }

  /**
   * Return the icon list from the given directory name.
   */
  getIconList() {
    return require("./assets/" + this.props.directory + "/index.js");
  }

  /**
   * Given a ico name, generate
   */
  toIconName(icon) {
    // Ignore font cases for these folders.
    if (["canton", "category"].indexOf(this.props.directory) > -1) {
      return icon;
    }

    return [
      icon,
      icon
        .replace(/\.?([A-Z])/g, (x, y) => "-" + y.toLowerCase())
        .replace(/^-/, "ico-")
    ];
  }

  render() {
    const icons = this.getIconList();

    return (
      <BoxCardWrapper>
        {Object.keys(icons)
          .sort()
          .map((icon, index) => (
            <BoxCard key={`asset-${index}`} name={this.toIconName(icon)}>
              {typeof icons[icon] === "object" ? (
                icons[icon]
              ) : (
                <img
                  className={classes.image}
                  src={icons[icon]}
                  width="75"
                  height="75"
                />
              )}
            </BoxCard>
          ))}
      </BoxCardWrapper>
    );
  }
}
