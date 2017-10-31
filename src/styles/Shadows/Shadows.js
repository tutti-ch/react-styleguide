import React from "react";
import classNames from "classnames";
import classes from "./Shadows.scss";
import { BoxItemWrapper, BoxItem } from "../../internals/Box";

const Shadows = () => {
  return (
    <BoxItemWrapper>
      <BoxItem label="Light Shadow">
        <div className={classNames(classes.shadowSample, classes.shadowS)} />
      </BoxItem>
      <BoxItem label="Medium Shadow">
        <div className={classNames(classes.shadowSample, classes.shadowM)} />
      </BoxItem>
      <BoxItem label="Light Top Shadow">
        <div className={classNames(classes.shadowSample, classes.shadowTopS)} />
      </BoxItem>
      <BoxItem label="Medium Top Shadow">
        <div className={classNames(classes.shadowSample, classes.shadowTopM)} />
      </BoxItem>
    </BoxItemWrapper>
  );
};

export default Shadows;
