import { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class OutsideClickable extends Component {
  static propTypes = {
    children: PropTypes.node,
    onOutsideClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.contains = this.contains.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.contains);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.contains);
  }

  contains(e) {
    const node = ReactDOM.findDOMNode(this);

    if (node && node.contains(e.target) === false) {
      this.props.onOutsideClick.call();
    }
  }

  render() {
    return this.props.children;
  }
}
