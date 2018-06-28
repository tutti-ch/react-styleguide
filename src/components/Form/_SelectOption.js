import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "../Image";
import { Close, Tick } from "../../styles/Icons/assets/generic";
import classNames from "classnames";
import classes from "./Form.scss";

class Option extends Component {
  static propTypes = {
    /**
     * The function which is triggered on click.
     */
    onClick: PropTypes.func,

    /**
     * The callback function which is triggered when close icon is clicked.
     */
    onClose: PropTypes.func,

    /**
     * Option value.
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Text to display.
     */
    text: PropTypes.string.isRequired,

    /**
     * The icon className.
     */
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node
    ]),

    /**
     * The src of an img.
     */
    image: PropTypes.string,

    /**
     * Whether the option is selected or not.
     */
    selected: PropTypes.bool,

    /**
     * Whether the option is highlighted or not.
     */
    highlighted: PropTypes.bool,

    /**
     * Whether the close icon is enabled or not.
     */
    closeIcon: PropTypes.bool,

    /**
     * Whether tick icon is enabled or not.
     */
    tickIcon: PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  select = e => {
    // istanbul ignore else
    if (typeof this.props.onClick === "function") {
      this.props.onClick(this.props, e);
    }
  };

  close = e => {
    e.preventDefault();
    e.stopPropagation();

    // istanbul ignore else
    if (typeof this.props.onClose === "function") {
      this.props.onClose(this.props);
    }
  };

  render() {
    const {
      value,
      text,
      selected,
      highlighted,
      closeIcon,
      tickIcon
    } = this.props;

    const optClasses = classNames(
      {
        [classes.selected]: selected,
        [classes.highlighted]: highlighted,
        [classes.placeholder]: value === null
      },
      classes.option
    );

    let { icon } = this.props;

    if (typeof icon === "string") {
      if (icon && icon.match(/^(\/|data:|https?:)|\.(svg|png|jpg|gif)$/)) {
        icon = <Image className={classes.icon} src={icon} />;
      }
    }

    return (
      <div onClick={this.select} className={optClasses} key={value}>
        {icon}
        <span className={classes.text}>{text}</span>
        {closeIcon && (
          <Close onClick={this.close} className={classes.icoClose} />
        )}
        {tickIcon && <Tick className={classes.icoCheck} />}
      </div>
    );
  }
}

export default Option;
