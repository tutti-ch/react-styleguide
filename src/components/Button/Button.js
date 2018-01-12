import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import Spinner from "../Spinner";
import classes from "./Button.scss";
import { filterProps } from "../../helpers/functions";

export default class Button extends Component {
  static LEVEL_PRIMARY = "primary";
  static LEVEL_SECONDARY = "secondary";
  static LEVEL_TERTIARY = "tertiary";

  static ROLE_WARNING = "warning";
  static ROLE_PROMOTE = "promote";

  static SIZE_SMALL = "small";
  static SIZE_MEDIUM = "medium";
  static SIZE_LARGE = "large";

  static POSITION_LEFT = "left";
  static POSITION_RIGHT = "right";
  static POSITION_FULL_WIDTH = "fullWidth";

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
    ]),

    /**
     * The level of the button. This has impact on the shape of the button.
     */
    level: PropTypes.oneOf([
      Button.LEVEL_PRIMARY,
      Button.LEVEL_SECONDARY,
      Button.LEVEL_TERTIARY
    ]).isRequired,

    /**
     * The role of the button. This will change the color of the button.
     */
    role: PropTypes.oneOf([Button.ROLE_PROMOTE, Button.ROLE_WARNING]),

    /**
     * The size of the button.
     */
    size: PropTypes.oneOf([
      Button.SIZE_SMALL,
      Button.SIZE_MEDIUM,
      Button.SIZE_LARGE
    ]).isRequired,

    /**
     * Whether the button is responsive or not. Default is false.
     */
    responsive: PropTypes.bool,

    /**
     * Whether there is an operation going on or not.
     */
    loading: PropTypes.bool,

    /**
     * The position of the button.
     */
    position: PropTypes.oneOf([
      Button.POSITION_LEFT,
      Button.POSITION_RIGHT,
      Button.POSITION_FULL_WIDTH
    ]),

    /**
     * Whether the button is rounded or not
     */
    rounded: PropTypes.bool
  };

  static defaultProps = {
    rounded: true,
    loading: false,
    size: Button.SIZE_MEDIUM
  };

  static Icon = props => (
    <span className={`ico ico-${props.icon} ${classes.icon}`} key="icon" />
  );

  static Text = props => (
    <span className={classes.text} key="text">
      {props.children}
    </span>
  );

  static contextTypes = {
    onSubmit: PropTypes.func
  };

  constructor(props, context) {
    super(props);
    this.getClasses = this.getClasses.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.state = {
      loading: props.loading
    };

    if (typeof context.onSubmit === "function") {
      context.onSubmit(({ loading }) => this.setState({ loading }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  /**
   * Return the appropriate classes for the button.
   */
  getClasses() {
    const {
      level,
      size,
      responsive,
      position,
      role,
      loading,
      rounded,
      className
    } = this.props;

    return classNames(
      className,
      classes.button,
      classes[level],
      classes[size],
      classes[role],
      classes[position],
      {
        [classes.responsive]: responsive,
        [classes.noRounded]: rounded === false,
        [classes.buttonLoading]: loading
      }
    );
  }

  /**
   * Render the content for the button.
   */
  renderContent() {
    const { children } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <Spinner
          className={classes.spinner}
          size={1.25}
          color={Spinner.COLOR_LIGHT}
          key="spinner"
        />
      );
    }

    return children;
  }

  /**
   * Render the button.
   *
   * @return {*}
   */
  render() {
    const attrs = filterProps(Button.propTypes, this.props);

    // By default, the type is submit
    if (typeof attrs.type === "undefined") {
      attrs.type = "submit";
    }

    return (
      <button className={this.getClasses()} {...attrs}>
        {this.renderContent()}
      </button>
    );
  }
}
