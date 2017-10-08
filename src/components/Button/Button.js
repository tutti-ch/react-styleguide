import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Spinner from "components/Spinner";
import classes from "./Button.scss";
import { filterProps } from 'helpers/functions'

export default class Button extends Component {
  static TYPE_BUTTON = 'button'
  static TYPE_SUBMIT = 'submit'

  static LEVEL_PRIMARY = 'primary'
  static LEVEL_SECONDARY = 'secondary'
  static LEVEL_TERTIARY = 'tertiary'

  static ROLE_WARNING = 'warning'
  static ROLE_PROMOTE = 'promote'

  static SIZE_SMALL = 'small'
  static SIZE_MEDIUM = 'medium'
  static SIZE_LARGE = 'large'

  static POSITION_LEFT = 'left'
  static POSITION_RIGHT = 'right'
  static POSITION_FULL_WIDTH = 'fullWidth'

  static propTypes = {
    /**
     * The content that will be rendered inside the button.
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,

    /**
     * The class name that will be passed to the button.
     */
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),

    /**
     * Define the type of the button.
     */
    type: PropTypes.oneOf([
      Button.TYPE_BUTTON,
      Button.TYPE_SUBMIT
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
    role: PropTypes.oneOf([
      Button.ROLE_PROMOTE,
      Button.ROLE_WARNING
    ]),

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
     * If an ico-{name} has been provided (name being the parameter passed here)
     * the icon will be displayed before the children.
     */
    icon: PropTypes.string,

    /**
     * If an ico-{name} has been provided (name being the parameter passed here)
     * the icon will be displayed after the children.
     */
    iconAfter: PropTypes.string,

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
    type: Button.TYPE_BUTTON
  };

  constructor(props) {
    super(props)
    this.getClasses = this.getClasses.bind(this)
    this.renderContent = this.renderContent.bind(this)
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
      responsive && classes.responsive,
      {
        [classes.noRounded]: rounded === false,
        [classes.buttonLoading]: loading
      }
    );
  }

  /**
   * Render the content for the button.
   */
  renderContent() {
    const { icon, iconAfter, loading, children } = this.props

    return [
      icon && <span className={`ico ico-${icon} ${classes.icon}`} key="icon"/>,
      children && <span className={classes.text} key="text">{children}</span>,
      loading && <Spinner className={classes.spinner} size={1.25} color={Spinner.COLOR_LIGHT} key="spinner"/>,
      iconAfter && <span className={`ico ico-${iconAfter} ${classes.iconAfter}`} key="icon-after"/>
    ]
  }

  /**
   * Render the button.
   *
   * @return {*}
   */
  render() {
    const { type } = this.props
    const attrs = filterProps(Button.propTypes, this.props)

    return (
      <button className={this.getClasses()} type={type} {...attrs}>
        {this.renderContent()}
      </button>
    );
  }
}
