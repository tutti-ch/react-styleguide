/* global require */
import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Illustrations.scss";
import { BoxCardWrapper, BoxCard } from "../../internals/Box";

export default class Illustrations extends Component {
  static propTypes = {
    /**
     * The directory name to load illustrations from.
     *
     * @ignore
     */
    directory: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.getIllustrationList = this.getIllustrationList.bind(this);
  }

  /**
   * Return the Illustration list from the given directory name.
   */
  getIllustrationList() {
    return require("./assets/" + this.props.directory + "/index.js");
  }

  renderIcon = (illustrations, illustration) => {
    const Icon = illustrations[illustration];
    return <Icon className={classes.image} src={illustrations[illustration]} />
  }

  render() {
    const illustrations = this.getIllustrationList();

    return (
      <BoxCardWrapper>
        {Object.keys(illustrations).map((illustration, index) => (
          <BoxCard key={`asset-${index}`} name={illustration}>
            {this.renderIcon(illustrations, illustration)}
          </BoxCard>
        ))}
      </BoxCardWrapper>
    );
  }
}
