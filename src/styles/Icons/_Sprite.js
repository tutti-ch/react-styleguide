import React from "react";
import PropTypes from "prop-types";
import SVG from "./assets/_sprite.svg";

export default class Sprite extends React.Component {
  static loaded = false;

  static propTypes = {
    id: PropTypes.string,
    viewBox: PropTypes.string
  };

  state = {
    ready: Sprite.loaded
  };

  req = new XMLHttpRequest();

  componentWillMount() {
    if (Sprite.loaded || typeof XMLHttpRequest === "undefined") {
      return;
    }

    Sprite.loaded = true;

    this.req.open("GET", SVG, true);
    this.req.send();
    this.req.onload = () => {
      const div = document.createElement("div");
      div.innerHTML = this.req.responseText;
      div.style.display = "none";
      document.body.insertBefore(div, document.body.childNodes[0]);
      this.setState({ ready: true });
    };
  }

  render() {
    const { viewBox, id } = this.props;
    const { ready } = this.state;

    if (!ready) {
      return null;
    }

    return (
      <svg role="img" viewBox={viewBox} className="svg-sprite">
        <use xlinkHref={"#" + id} />
      </svg>
    );
  }
}
