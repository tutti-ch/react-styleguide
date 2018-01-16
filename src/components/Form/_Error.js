import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Form.scss";

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

    if (!error) {
      return null;
    }

    return <div className={classes.genericError}>{error}</div>;
  }
}
