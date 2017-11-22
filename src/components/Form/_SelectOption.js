import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "../Image";
import classNames from "classnames";
import classes from "./Form.scss";

class Option extends Component {
  static propTypes = {
    /**
     * The on function which is triggered on click.
     */
    onClick: PropTypes.func,

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
     * Whether this is a multi select or not.
     */
    multiple: PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  select(e) {
    // istanbul ignore else
    if (typeof this.props.onClick === "function") {
      this.props.onClick(this.props, e);
    }
  }

  render() {
    const { value, text, icon, selected, highlighted, multiple } = this.props;
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
          isImage === true && <Image className={classes.icon} src={icon} />}
        <span className={classes.text}>{text}</span>
        { multiple && <span className={`ico ico-close ${classes.icoClose}`}></span>}
        { multiple && <span className={`ico ico-check ${classes.icoClose}`}></span>}
      </div>
    );
  }
}

export default Option;
