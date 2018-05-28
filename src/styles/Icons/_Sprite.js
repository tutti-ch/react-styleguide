import React from "react";
import PropTypes from "prop-types";
import SVG from "./assets/_sprite.svg";
import s4e from "svg4everybody";
import cn from "classnames";

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
    if (this.req) {
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

    if (!ready) {
      return (
        // Placeholder
        <svg viewBox="0 0 35 35" className={cn("svg-placeholder", className)}>
          <path
            fill="#fff"
            d="M26.8 14.7h-6.6V8.1h-5.6v6.6H8v5.6h6.6v6.6h5.6v-6.6h6.6z"
          />
          <path
            d="M17.5 0C7.8 0 0 7.8 0 17.5S7.8 35 17.5 35 35 27.2 35 17.5 27.2 0 17.5 0z"
            fill="#e5e5e5"
          />
        </svg>
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
