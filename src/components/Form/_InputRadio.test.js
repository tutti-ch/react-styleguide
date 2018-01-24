/* global describe, test, expect, jest */
import React from "react";
import InputRadioGroup from "./_InputRadioGroup";
import InputRadio from "./_InputRadio";
import { shallow, mount } from "enzyme";

describe("(Component) InputRadio", () => {
  test("[componentWillReceiveProps] should sync the state with props", () => {
    const comp = shallow(<InputRadio />);
    const inst = comp.instance();
    inst.componentWillReceiveProps({ checked: true });
    expect(comp.state("checked")).toBe(true);
  });

  test("[select] should set the value and call the onChange from parent", () => {
    const spy = jest.fn();
    const comp = shallow(<InputRadio onChange={spy} />);
    const inst = comp.instance();
    inst.select();
    expect(comp.state("checked")).toBe(true);
    expect(spy).toHaveBeenCalled();

    comp.setProps({ onChange: undefined });
    inst.select();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(comp.state("checked")).toBe(true); // A selected radio can not be unselected.
  });

  test("snapshot", () => {
    const comp = mount(
      <InputRadioGroup name="input-name">
        <InputRadio value="Life is good" checked label="My label" />
        <InputRadio value="Life is good" checked label="My label" />
      </InputRadioGroup>
    );
    expect(comp).toMatchSnapshot();
  });
});
