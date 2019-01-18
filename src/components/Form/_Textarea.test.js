/* global describe, test, expect, jest */
import React from "react";
import { Textarea } from "./_Textarea";
import { shallow, mount } from "enzyme";

describe("(Component) Textarea", () => {
  test("[componentDidUpdate] should sync the state with props", () => {
    const comp = shallow(<Textarea />);
    const inst = comp.instance();
    inst.setState = jest.fn();
    comp.setProps({ value: "Frocello" });
    expect(inst.setState).toMatchSnapshot();
  });

  test("[handleChange] should set the value and call the onChange from parent", () => {
    const comp = shallow(<Textarea />);
    const inst = comp.instance();
    inst.handleChange({ target: { value: "Moreno" } });
    expect(comp.state("value")).toBe("Moreno");
  });

  test("[handleBlur] should notify the parent and call attached onBlur", () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const comp = shallow(<Textarea onBlur={onBlur} onChange={onChange} />);
    const inst = comp.instance();
    const event = {};
    inst.handleBlur(event);
    expect(onBlur).toHaveBeenCalledWith(event);
    expect(onChange).not.toHaveBeenCalled(); // Because nothing changed.
  });

  test("[handleKeyUp] should notify the parent and call attached onKeyUp", () => {
    const onKeyUp = jest.fn();
    const onChange = jest.fn();
    const comp = shallow(<Textarea onKeyUp={onKeyUp} onChange={onChange} />);
    const inst = comp.instance();
    inst.handleChange({ target: { value: "abc" } });
    inst.handleKeyUp({ key: "Enter" });
    expect(onKeyUp).toHaveBeenCalledWith({ key: "Enter" });
    expect(onChange).toHaveBeenCalled();

    comp.setProps({ onKeyUp: undefined });
    inst.handleChange({ target: { value: "def" } });
    inst.handleKeyUp({ key: "ArrowDown" });
    expect(onKeyUp).toHaveBeenCalledTimes(1); // Because we have set to undefined
    expect(onChange).toHaveBeenCalledTimes(1); // Because they key up was not an enter 😀
  });

  test("snapshot", () => {
    const comp = mount(<Textarea value="Life is good" type="text" />);
    expect(comp).toMatchSnapshot();
  });
});
