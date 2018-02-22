import React, { Component } from "react";
import PropTypes from "prop-types";
import { BoxItemWrapper, BoxItem, BoxCardWrapper, BoxCard } from "../../internals/Box";
import LogoAnimated from "../../components/Logo";
import LogoFallback from "../../components/Logo/assets/logo-fallback.svg";

export default class Logos extends Component {

  static propTypes = {
    /**
     * The directory name to load illustrations from.
     *
     * @ignore
     */
    directory: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.getLogosList = this.getLogosList.bind(this);
  }

  getLogosList() {
    if (!this.props.directory) {
      return null;
    }

    return require("./assets/" + this.props.directory + "/index.js");
  }


  render() {
    const directory = this.props.directory;
    const logos = this.getLogosList();

    return (
      <div>
        <BoxItemWrapper>
          {
            !directory && <div>
            <BoxItem>
              <LogoAnimated />
            </BoxItem>
            <BoxItem>
              <img src={LogoFallback} height="44" />
            </BoxItem></div>
          }
        </BoxItemWrapper>
        <BoxCardWrapper>

          {
              directory &&
                Object.keys(logos).map((logo, index) => (
                  <BoxCard key={`asset-${index}`} name={logo}>
                    <img
                      src={logos[logo]}
                      width="75"
                    />
                  </BoxCard>
                ))
          }
        </BoxCardWrapper>
      </div>
    );
  }
}
