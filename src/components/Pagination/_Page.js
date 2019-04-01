import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./Pagination.scss";

export default class Page extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    url: PropTypes.string
  };

  static defaultProps = {
    url: "#"
  };

  handleClick = number => e => {
    e.preventDefault();
    const { onClick } = this.props;

    if (typeof onClick === "function") {
      this.props.onClick(number);
    }
  };

  render() {
    const { number, icon: Icon, active, disabled, url } = this.props;

    const listItemClasses = classNames(classes.page, {
      [classes.active]: active,
      [classes.inactive]: active === false,
      [classes.disabled]: disabled
    });

    const linkClasses = classNames("link", [classes.link]);

    return (
      <li className={listItemClasses}>
        <a
          href={url}
          className={linkClasses}
          aria-label={`Go to page ${number}`}
          onClick={this.handleClick(number)}
        >
          {Icon ? <Icon /> : number}
        </a>
      </li>
    );
  }
}
