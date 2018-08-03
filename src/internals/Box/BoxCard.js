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
 * @params style
 * @constructor
 */
const BoxCard = ({ className, children, name, style }) => {
  const _name = Array.isArray(name)
    ? name.map((n, i) => <div key={`key-${i}`}>{n}</div>)
    : name;

  return (
    <div className={classNames(className, classes.card)} style={style}>
      <div className={classes.inner}>
        <div className={classes.content}>{children}</div>
        <div className={classes.desc} title={_name}>
          {_name}
        </div>
      </div>
    </div>
  );
};

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
