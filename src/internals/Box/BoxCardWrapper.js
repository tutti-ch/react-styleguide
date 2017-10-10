import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./Box.scss";

/**
 * BoxCardWrapper component for box items.
 *
 * @param className
 * @param children
 * @constructor
 */
const BoxCardWrapper = ({ className, children }) => (
  <div
    className={classNames(className, classes.wrapper, classes.BoxCardWrapper)}
  >
    {children}
  </div>
);

BoxCardWrapper.propTypes = {
  className: PropTypes.oneOf([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  children: PropTypes.node
};

export default BoxCardWrapper;
