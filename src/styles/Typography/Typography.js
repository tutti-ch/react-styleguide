import React from "react";
import classes from "../style-guide.scss";

const Typography = () => (
  <div className={`${classes.wrapper} ${classes.typographySection}`}>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>
      This is a paragraph using "Roboto Light" (Currently our default font weight) with <i>italic</i>, <u>underlined</u> and <b>bold</b>{" "}
      text.
    </p>
    <p className={classes.regularTypography}>
      This is a paragraph using "Roboto Regular" with <i>italic</i>, <u>underlined</u> and <b>bold</b>{" "}
      text.
    </p>
  </div>
);

export default Typography;
