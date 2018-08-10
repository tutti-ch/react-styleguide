import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { filterProps } from "../../helpers/functions";
import Spinner from "../Spinner";
import classes from "./Button.scss";

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
    size: Button.SIZE_MEDIUM,
    type: "submit"
  };

  static contextTypes = {
    onSubmit: PropTypes.func
  };

  state = {
    loading: this.props.loading
  };

  constructor(props, context) {
    super(props);

    const { onSubmit } = context;
    const { type = "submit" } = props;

    if (typeof onSubmit === "function" && type === "submit") {
      onSubmit(({ loading }) => this.setState({ loading }));
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
  getClasses = () => {
    const {
      level,
      size,
      responsive,
      position,
      role,
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
        [classes.noRounded]: rounded === false
      }
    );
  };

  /**
   * Render the content for the button.
   */
  renderContent = () => {
    const { children } = this.props;
    const { loading } = this.state;

    if (loading) {
      return [
        <Spinner
          className={classes.spinner}
          size={1.25}
          color={Spinner.COLOR_LIGHT}
          key="spinner"
        />,
        <div className={classes.text} key={"text"}>
          {children}
        </div>
      ];
    }

    return children;
  };

  /**
   * Render the button.
   *
   * @return {*}
   */
  render() {
    const attrs = filterProps(Button.propTypes, this.props);

    // When it is loading, the button is disabled by default.
    if (this.state.loading) {
      attrs.disabled = true;
    }

    return (
      <button className={this.getClasses()} {...attrs}>
        {this.renderContent()}
      </button>
    );
  }
}
