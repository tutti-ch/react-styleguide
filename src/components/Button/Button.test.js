/* global describe, test, expect */
import React from "react";
import Button from "./Button";
import { mount } from "enzyme";

describe("(Component) Button", () => {
  test("should render snapshot correctly", done => {
    const props = {
      disabled: true,
      className: "my-class"
    };

    const comp = mount(
      <Button level="primary" size="large" {...props}>
        <span className={"tutti-cube"} />
        Test content
      </Button>
    );

    expect(comp).toMatchSnapshot();

    // Should be still disabled true because when state.loading is true
    // the attribute is overwritten.
    comp.setProps({ loading: true, type: "button", disabled: false });
    setTimeout(() => {
      expect(comp).toMatchSnapshot();
      done();
    }, 100);
  });
});
