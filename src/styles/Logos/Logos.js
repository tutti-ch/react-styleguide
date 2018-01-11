/* global require */
import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Logos.scss";
import { BoxItemWrapper, BoxItem } from "../../internals/Box";

export default class Logos extends Component {
  static propTypes = {
    /**
     * The directory name to load logos from.
     *
     * @ignore
     */
    directory: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.getLogosList = this.getLogosList.bind(this);
  }

  /**
   * Return the Logos list from the given directory name.
   */
  getLogosList() {
    return require("./assets/" + this.props.directory + "/index.js");
  }

  render() {
    const logos = this.getLogosList();

    return (
      <BoxItemWrapper>
        {Object.keys(logos).map((logo, index) => (
          <BoxItem key={`asset-${index}`} name={logo}>
            <img
              className={classes.image}
              src={logos[logo]}
              height="75"
            />
          </BoxItem>
        ))}
      </BoxItemWrapper>
    );
  }
}
