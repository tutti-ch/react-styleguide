/* global describe, test, expect, jest */
import React from "react";
import { Input } from "./_Input";
import { shallow, mount } from "enzyme";

describe("(Component) Input", () => {
  test("[componentWillReceiveProps] should sync the state with props", () => {
    const comp = shallow(<Input />);
    const inst = comp.instance();
    inst.componentWillReceiveProps({ value: "Frocello" });
    expect(comp.state("value")).toBe("Frocello");
  });

  test("[handleChange] should set the value and call the onChange from parent", () => {
    const comp = shallow(<Input />);
    const inst = comp.instance();
    inst.handleChange({ target: { value: "Moreno" } });
    expect(comp.state("value")).toBe("Moreno");
  });

  test("[handleBlur] should notify the parent and call attached onBlur", () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const comp = shallow(<Input onBlur={onBlur} onChange={onChange} />);
    const inst = comp.instance();
    const event = {};
    inst.handleBlur(event);
    expect(onBlur).toHaveBeenCalledWith(event);
    expect(onChange).not.toHaveBeenCalled(); // Because nothing changed.
  });

  test("[handleKeyDown] should notify the parent and call attached onKeyDown", () => {
    const onKeyDown = jest.fn();
    const onChange = jest.fn();
    const comp = shallow(<Input onKeyDown={onKeyDown} onChange={onChange} />);
    const inst = comp.instance();
    inst.handleChange({ target: { value: "abc" } });
    inst.handleKeyDown({ key: "Enter" });
    expect(onKeyDown).toHaveBeenCalledWith({ key: "Enter" });
    expect(onChange).toHaveBeenCalled();

    comp.setProps({ onKeyDown: undefined });
    inst.handleChange({ target: { value: "def" } });
    inst.handleKeyDown({ key: "ArrowDown" });
    expect(onKeyDown).toHaveBeenCalledTimes(1); // Because we have set to undefined
    expect(onChange).toHaveBeenCalledTimes(1); // Because they key up was not an enter 😀
  });

  test("Should call notify when new props are received", () => {
    const notify = jest.fn();
    const comp = shallow(<Input />);
    const inst = comp.instance();
    inst.notify = notify;
    comp.setProps({ value: "newValue" });
    expect(notify).toHaveBeenCalled();
  });

  test("snapshot", () => {
    const comp = mount(<Input value="Life is good" type="text" />);
    expect(comp).toMatchSnapshot();
  });
});
