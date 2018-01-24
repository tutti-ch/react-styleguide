/* global describe, test, expect, jest */
import React from "react";
import { InputRadioGroup } from "./_InputRadioGroup";
import InputRadio from "./_InputRadio";
import { mount } from "enzyme";

describe("(Component) InputRadioGroup", () => {
  test("should handle the change of the children states", () => {
    const onChange = jest.fn();

    const comp = mount(
      <InputRadioGroup onChange={onChange}>
        <InputRadio label="React.js" name="fmw" />
        <InputRadio label="Vue.js" name="fmw" checked />
        <InputRadio label="Angular.js" value="ang" name="fmw" />
      </InputRadioGroup>
    );

    expect(comp.state("selected")).toBe(1); // The index of the selected radio

    comp.instance().handleOnChange(2)("ang", { name: "fmw" });
    expect(onChange).toHaveBeenCalledWith("ang", { name: "fmw" });
    expect(comp.state("selected")).toBe(2);

    comp.update();
    expect(comp).toMatchSnapshot();
  });
});
