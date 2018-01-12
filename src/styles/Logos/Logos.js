import React, { Component } from "react";

import { BoxItemWrapper, BoxItem } from "../../internals/Box";
import LogoAnimated from "../../components/Logo";
import LogoFallback from "../../components/Logo/assets/logo-fallback.svg";

export default class Logos extends Component {
  render() {
    return (
      <BoxItemWrapper>
        <BoxItem>
          <LogoAnimated />
        </BoxItem>
        <BoxItem>
          <img src={LogoFallback} height="44" />
        </BoxItem>
      </BoxItemWrapper>
    );
  }
}
