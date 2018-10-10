import React from "react";
import PropTypes from "prop-types";

import classes from "./Logo.scss";
import Image from "../Image/Image";
import TuttiSymbolSquare from "./assets/tutti-logo-square.svg";
import TuttiSymbolT from "./assets/tutti-logo-t-white.svg";
import TuttiFont from "./assets/tutti-logo-font.svg";
import TuttiFallback from "./assets/tutti-logo-vertical-small.svg";

const Logo = ({ className }) => (
  <div className={classes.logo}>
    <div className={classes.symbolBox}>
      <Image
        className={classes.symbolSquare}
        src={TuttiSymbolSquare}
        alt="tutti.ch"
      />
      <Image className={classes.symbolT} src={TuttiSymbolT} alt="tutti.ch" />
    </div>
    <Image className={classes.font} src={TuttiFont} alt="tutti.ch" />
    <Image className={classes.fallback} src={TuttiFallback} alt="tutti.ch" />
  </div>
);

Logo.propTypes = {
  className: PropTypes.string
};

export default Logo;
