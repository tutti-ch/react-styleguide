import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "../Image";
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
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

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

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.close = this.close.bind(this);
  }

  select(e) {
    // istanbul ignore else
    if (typeof this.props.onClick === "function") {
      this.props.onClick(this.props, e);
    }
  }

  close(e) {
    e.preventDefault();
    e.stopPropagation();

    // istanbul ignore else
    if (typeof this.props.onClose === "function") {
      this.props.onClose(this.props);
    }
  }

  render() {
    const {
      value,
      text,
      icon,
      selected,
      highlighted,
      closeIcon,
      tickIcon
    } = this.props;
    const isImage = !!(icon && icon.match(/^(\/|data:|https?:)/)); // If either absolute url, or dataURI or url is an image

    const optClasses = classNames(
      {
        [classes.selected]: selected,
        [classes.highlighted]: highlighted,
        [classes.placeholder]: value === null
      },
      classes.option
    );

    return (
      <div onClick={this.select} className={optClasses} key={value}>
        {icon &&
          isImage === false && (
            <span className={classNames(classes.icon, icon)} />
          )}
        {icon &&
          isImage === true && /* istanbul ignore next */ <Image className={classes.icon} src={icon} />}
        <span className={classes.text}>{text}</span>
        {closeIcon && (
          <span
            onClick={this.close}
            className={`ico ico-close ${classes.icoClose}`}
          />
        )}
        {tickIcon && <span className={`ico ico-tick ${classes.icoCheck}`} />}
      </div>
    );
  }
}

export default Option;
