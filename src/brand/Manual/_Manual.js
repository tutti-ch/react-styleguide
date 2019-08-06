import React from "react";
import pdf from "./assets/brand_guidelines.pdf";
import illustrator from "./assets/brand_guidelines.ai";

const Manual = () => {
  return (
    <>
      <p style={{ marginBottom: "2rem" }}>
        The Brand manual define the identity of tutti.ch and gives instructions
        on how to use it. Download file in{" "}
        <a className="rsg--link-37" href={pdf}>
          pdf
        </a>{" "}
        or{" "}
        <a className="rsg--link-37" href={illustrator}>
          Illustrator
        </a>
      </p>
    </>
  );
};

export default Manual;
