/* global describe, test, expect */
import React from "react";
import Button from "./Button";
import { mount } from "enzyme";

describe("(Component) Button", () => {
  test("should render snapshot correctly", () => {
    const props = {
      icon: "tutti-cube",
      iconAfter: "test-ico",
      disabled: true,
      className: "my-class"
    };

    const comp = mount(
      <Button level="primary" size="large" {...props}>
        Test content
      </Button>
    );

    expect(comp).toMatchSnapshot();

    comp.setProps({ loading: true, type: "button" });
    expect(comp).toMatchSnapshot();
  });
});
