import React from "react";
import PropTypes from "prop-types";
import SVG from "./assets/_sprite.svg";
import s4e from "svg4everybody";
import cn from "classnames";
import "./_Sprite.scss";

export default class Sprite extends React.Component {
  static loaded = false;
  static loading = [];

  static propTypes = {
    id: PropTypes.string,
    viewBox: PropTypes.string
  };

  state = {
    ready: Sprite.loaded
  };

  req = typeof XMLHttpRequest !== "undefined" && new XMLHttpRequest();

  componentDidMount() {
    if (this.req && Sprite.loaded === false) {
      Sprite.loading.push(this);

      if (Sprite.loading.length > 1) {
        return;
      }

      this.req.open("GET", SVG, true);
      this.req.send();
      this.req.onload = () => {
        const div = document.createElement("div");
        div.innerHTML = this.req.responseText;
        div.style.display = "none";
        document.body.insertBefore(div, document.body.childNodes[0]);
        this.setState({ ready: true }, s4e);
        Sprite.loaded = true;
        Sprite.loading.forEach(c => c.setState({ ready: true }));
      };
    }
  }

  render() {
    const { viewBox, id, className, ...rest } = this.props;
    const { ready } = this.state;

    // Display Placeholder
    if (!ready) {
      return (
        <span className={cn("svg-placeholder", "svg-sprite", className)} />
      );
    }

    return (
      <svg
        role="img"
        {...rest}
        viewBox={viewBox}
        className={cn("svg-sprite", className)}
      >
        <use xlinkHref={"#" + id} />
      </svg>
    );
  }
}
