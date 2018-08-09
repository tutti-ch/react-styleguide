import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classes from "./_Tooltip.scss";
import classNames from "classnames";
import { Close } from "../../styles/Icons/assets/generic";

export default class Tooltip extends PureComponent {
  static APPEAR_AFTER = 1000; // Will tell the tooltip to appear after this ms

  static defaultProps = {
    arrowPosition: "t",
    appearAfter: Tooltip.APPEAR_AFTER
  };

  static propTypes = {
    /**
     * The position of the arrow.
     */
    arrowPosition: PropTypes.oneOf([
      "t",
      "tr",
      "tl", // top, top-right, top-left
      "b",
      "br",
      "bl", // bottom, bottom-right, bottom-left
      "r",
      "rt",
      "rb", // right, right-top, right-bottom
      "l",
      "lt",
      "lb" // left, left-top, left-bottom
    ]),

    /**
     * The nodes to display in the tooltip.
     */
    children: PropTypes.node,

    /**
     * A unique identifier. If the user has closed the tooltip before,
     * we will not show it again.
     */
    name: PropTypes.string,

    /**
     * Number of ms for the tooltip to appear.
     */
    appearAfter: PropTypes.number
  };

  state = {
    closed: true,
    render: false
  };

  componentDidMount() {
    // Promise is here for unit-testing.
    return new Promise(res => {
      setTimeout(() => {
        if (this.unmounted !== true) {
          this.setState(
            {
              render: !localStorage.getItem(this.props.name), // Render only if the user has not closed before
              closed: false
            },
            res
          );
        }
      }, this.props.appearAfter);
    });
  }

  close = () => {
    // Again, promise is for unit-testing
    return new Promise(res => {
      const { name } = this.props;

      this.setState({ closed: true }, () => {
        if (name) {
          localStorage.setItem(name, "set");
        }

        const time = parseFloat(classes.animationTime) * 1000;
        setTimeout(() => {
          if (this.unmounted !== true) {
            this.setState({ render: false }, res);
          }
        }, time);
      });
    });
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { closed, render } = this.state;
    const { arrowPosition, appearAfter, name, children, ...rest } = this.props;

    if (!render) {
      return null;
    }

    const tooltipClasses = classNames(classes.tooltip, classes[arrowPosition], {
      [classes.close]: closed
    });

    return (
      <div {...rest} className={tooltipClasses}>
        {children}
        <div className={classes.closeButton} onClick={this.close}>
          <Close />
        </div>
      </div>
    );
  }
}
