import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BoxItemWrapper,
  BoxItem,
  BoxCardWrapper,
  BoxCard
} from "../../internals/Box";
import LogoAnimated from "../../components/Logo";

export default class Logos extends Component {
  static propTypes = {
    /**
     * The directory name to load illustrations from.
     *
     * @ignore
     */
    directory: PropTypes.string
  };

  getLogosList = () => {
    if (!this.props.directory) {
      return null;
    }

    return require("./assets/" + this.props.directory + "/index.js");
  };

  render() {
    const directory = this.props.directory;
    const logos = this.getLogosList();

    return (
      <div>
        <BoxItemWrapper>
          {!directory && (
            <div>
              <BoxItem>
                <LogoAnimated />
              </BoxItem>
            </div>
          )}
        </BoxItemWrapper>
        <BoxCardWrapper>
          {directory &&
            Object.keys(logos).map((logo, index) => {
              const Logo = logos[logo];
              return (
                <BoxCard
                  key={`asset-${index}`}
                  name={logo}
                  style={{
                    background: logo.match(/white|negative/i)
                      ? "#ccc"
                      : undefined
                  }}
                >
                  <Logo width={"75px"} />
                </BoxCard>
              );
            })}
        </BoxCardWrapper>
      </div>
    );
  }
}
