import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./Box.scss";

/**
 * Display a box-looking div with content inside of it.
 *
 * @param className
 * @param children
 * @param name
 * @constructor
 */
const BoxItem = ({ className, children, label }) => (
  <div className={classNames(className, classes.item)}>
    <div className={classes.content}>{children}</div>
    <div className={classes.label}>{label}</div>
  </div>
);

BoxItem.propTypes = {
  className: PropTypes.oneOf([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  children: PropTypes.node, // The content of the box
  label: PropTypes.string // The label of the box (this will be displayed at the left of the box item)
};

export default BoxItem;
