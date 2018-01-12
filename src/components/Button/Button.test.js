/* global describe, test, expect */
import React from "react";
import Button from "./Button";
import { mount } from "enzyme";

describe("(Component) Button", () => {
  test("should render snapshot correctly", () => {
    const props = {
      disabled: true,
      className: "my-class"
    };

    const comp = mount(
      <Button level="primary" size="large" {...props}>
        <Button.Icon icon="tutti-cube" />
        <Button.Text>Test content </Button.Text>
        <Button.Icon icon="text-ico" />
      </Button>
    );

    expect(comp).toMatchSnapshot();

    comp.setProps({ loading: true, type: "button", disabled: false }); // Should be still disabled true
    expect(comp).toMatchSnapshot();
  });
});
