import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./Tabs.scss";

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    const { onClick, index } = this.props;
    onClick(index);
  }

  render() {
    const { isActive, title } = this.props;
    const tabClasses = classNames(classes.tab, { [classes.active]: isActive });

    return (
      <div className={tabClasses} onClick={this.handleOnClick}>
        {title}
      </div>
    );
  }
}
