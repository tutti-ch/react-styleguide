import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Form.scss";
import classNames from "classnames";

export default class Error extends Component {
  static contextTypes = {
    genericErrorHandler: PropTypes.func
  };

  constructor(props, context) {
    super(props);

    this.setError = this.setError.bind(this);
    this.state = {
      error: null
    };

    if (typeof context.genericErrorHandler === "function") {
      context.genericErrorHandler(this);
    }
  }

  setError(message) {
    this.setState({ error: message });
  }

  render() {
    const { error } = this.state;
    const { className } = this.props;

    if (!error) {
      return null;
    }

    const errorClasses = classNames(className, classes.genericError);
    return <div className={`errorMessage ${errorClasses}`}>{error}</div>;
  }
}
