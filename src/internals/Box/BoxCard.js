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
const BoxCard = ({ className, children, name }) => (
  <div className={classNames(className, classes.card)}>
    <div className={classes.inner}>
      <div className={classes.content}>{children}</div>
      <div className={classes.desc}>
        {Array.isArray(name)
          ? name.map((n, i) => <div key={`key-${i}`}>{n}</div>)
          : name}
      </div>
    </div>
  </div>
);

BoxCard.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  children: PropTypes.node, // The content of the box
  name: PropTypes.oneOfType([
    PropTypes.string, // The name of the box (this will be displayed at the bottom of the box card)
    PropTypes.array
  ])
};

export default BoxCard;
