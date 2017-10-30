import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "../Image";
import classNames from "classnames";
import classes from "./Form.scss";

class Option extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    text: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    image: PropTypes.string,
    selected: PropTypes.bool,
    highlighted: PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  select() {
    // istanbul ignore else
    if (typeof this.props.onClick === "function") {
      this.props.onClick(this.props);
    }
  }

  render() {
    const { value, text, icon, selected, highlighted } = this.props;
    const isImage = !!(icon && icon.match(/^(\/|data:|https?:)/)); // If either absolute url, or dataURI or url is an image

    return (
      <div
        onClick={this.select}
        className={classNames(
          { [classes.selected]: selected, [classes.highlighted]: highlighted },
          classes.option
        )}
        key={value}
      >
        {icon &&
          isImage === false && (
            <span className={classNames(classes.icon, icon)} />
          )}
        {icon &&
          isImage === true && <Image className={classes.icon} src={icon} />}
        <span className={classes.text}>{text}</span>
      </div>
    );
  }
}

export default Option;
