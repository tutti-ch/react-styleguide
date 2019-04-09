import React from "react";
import animatioMain from "./logo-main-long.mp4";
import animationNegative from "./logo-negative-short.mp4";

/**
 *
 * @visibleName Animations
 */

class Animations extends React.Component {
  render() {
    return (
      <div>
        <video
          width="900"
          height="600"
          controls
          autoPlay
          style={{
            width: "100%",
            "margin-bottom": "40px"
          }}
        >
          <source src={animationNegative} type="video/mp4" />
        </video>
        <video
          width="900"
          height="600"
          controls
          autoPlay
          style={{
            width: "100%",
            "margin-bottom": "40px"
          }}
        >
          <source src={animatioMain} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Animations;
