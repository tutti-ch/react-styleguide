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
    onClick: PropTypes.func
  };

  render() {
    const { number, icon: Icon, active, disabled, onClick } = this.props;

    const listItemClasses = classNames(classes.page, {
      [classes.active]: active,
      [classes.inactive]: active === false,
      [classes.disabled]: disabled
    });

    const linkClasses = classNames("link", [classes.link]);

    return (
      <li className={listItemClasses} onClick={onClick(number)}>
        <div className={linkClasses}>{Icon ? <Icon /> : number}</div>
      </li>
    );
  }
}
