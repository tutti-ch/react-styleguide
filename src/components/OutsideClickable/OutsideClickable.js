/* OutsideClickable only accepts one top-level child */
import React, { Component, Children, cloneElement } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class OutsideClickable extends Component {
  static propTypes = {
    children: PropTypes.node,
    onOutsideClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    toggle: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if ("ontouchstart" in window) {
      document.body.addEventListener("touchstart", this.contains);
    } else {
      window.addEventListener("click", this.contains);
    }
  }

  componentWillUnmount() {
    if ("ontouchstart" in window) {
      document.body.removeEventListener("touchstart", this.contains);
    } else {
      window.removeEventListener("click", this.contains);
    }
  }

  contains = e => {
    const node = this.outsideClickable;

    if (node && node.contains(e.target) === false) {
      this.props.onOutsideClick.call();
    }
  };

  onlyOneChild = () => {
    if (this.props.children.length > 1) {
      throw new Error("Multiple children are not allowed in OutsideClickable");
    }

    return true;
  };

  render() {
    return (
      this.onlyOneChild() &&
      Children.map(this.props.children, child =>
        cloneElement(child, {
          ref: node => {
            // Keep your own reference
            this.outsideClickable = node;
            // Call the original ref, if any
            const { ref } = child;

            if (typeof ref === "function") {
              ref(node);
            }
          }
        })
      )
    );
  }
}
