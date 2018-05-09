import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./TriggerLink.scss";

import { filterProps } from "../../helpers/functions";

export default class TriggerLink extends Component {
  static propTypes = {
    /**
     * The content that will be rendered inside the button.
     */
    children: PropTypes.node,

    /**
     * The class name that will be passed to the button.
     */
    className: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ])
  };
  render() {
    const { children, className } = this.props;
    const mergedClasses = classNames(className, classes.triggerLink);
    const attrs = filterProps(TriggerLink.propTypes, this.props);

    return (
      <button className={mergedClasses} {...attrs}>
        {children}
      </button>
    );
  }
}
