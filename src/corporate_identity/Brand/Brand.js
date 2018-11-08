import React from "react";
import pdf from "./assets/brand_guidelines.pdf";
import illustrator from "./assets/brand_guidelines.ai";

const Brand = () => {
  return (
    <>
      <p style={{ marginBottom: "2rem" }}>
        The brand guidelines define the identity of tutti.ch and gives
        instructions on how to use it.{" "}
        <a class="rsg--link-37" href={illustrator}>
          Download Illustrator file
        </a>
      </p>
      <embed src={pdf} width="100%" height="400" type="application/pdf" />
    </>
  );
};

export default Brand;
