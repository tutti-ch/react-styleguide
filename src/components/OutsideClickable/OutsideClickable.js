import React, { Component } from "react";
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

    this.outsideClickable = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("click", this.contains);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.contains);
  }

  contains = e => {
    const node = this.outsideClickable.current;

    if (node && node.contains(e.target) === false) {
      this.props.onOutsideClick.call();
    }
  };

  render() {
    return (
      <div className={this.props.className} ref={this.outsideClickable}>
        {this.props.children}
      </div>
    );
  }
}
