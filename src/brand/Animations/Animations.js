import React from "react";
import AnimationNegative from "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4";

/**
 *
 * @visibleName Animations
 */

class Animations extends React.Component {
  render() {
    return <video width="320" height="240" src={AnimationNegative} />;
  }
}

export default Animations;
