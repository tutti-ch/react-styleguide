import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./Logo.scss";
import Image from "../Image/Image";
import TuttiSymbolSquare from "./assets/tutti-logo-square.svg";
import TuttiSymbolT from "./assets/tutti-logo-t-white.svg";
import TuttiFont from "./assets/tutti-logo-font.svg";
import TuttiFallback from "./assets/tutti-logo.svg";

export class Logo extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    hideFont: PropTypes.bool
  };
  render() {
    const { hideFont } = this.props;

    const logoClasses = classNames(classes.logo, {
      [classes.hideFont]: hideFont
    });

    return (
      <div className={logoClasses}>
        <div className={classes.symbolBox}>
          <Image
            className={classes.symbolSquare}
            src={TuttiSymbolSquare}
            alt="tutti.ch"
          />
          <Image
            className={classes.symbolT}
            src={TuttiSymbolT}
            alt="tutti.ch"
          />
        </div>
        {!hideFont && (
          <Image className={classes.font} src={TuttiFont} alt="tutti.ch" />
        )}
        <Image
          className={classes.fallback}
          src={TuttiFallback}
          alt="tutti.ch"
        />
      </div>
    );
  }
}

export default Logo;
