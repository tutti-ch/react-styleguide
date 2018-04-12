/* global describe, test, expect, jest */
import React from "react";
import { InputCheckbox } from "./_InputCheckbox";
import { shallow, mount } from "enzyme";

describe("(Component) InputCheckbox", () => {
  test("[componentWillReceiveProps] should sync the state with props", () => {
    const comp = shallow(<InputCheckbox />);
    const inst = comp.instance();
    inst.componentWillReceiveProps({ checked: true });
    expect(comp.state("checked")).toBe(true);
  });

  test("[toggle] should set the value and call the onChange from parent", () => {
    const spy = jest.fn();
    const comp = shallow(<InputCheckbox onChange={spy} />);
    const inst = comp.instance();
    inst.toggle();
    expect(comp.state("checked")).toBe(true);
    expect(spy).toHaveBeenCalled();
    inst.toggle.cancel();

    comp.setProps({ onChange: undefined });
    inst.toggle();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(comp.state("checked")).toBe(false);
  });

  test("snapshot", () => {
    const comp = mount(
      <InputCheckbox value="Life is good" checked label="My label" />
    );
    expect(comp).toMatchSnapshot();
  });
});
