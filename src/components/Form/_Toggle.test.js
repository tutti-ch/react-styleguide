/* global describe, test, jest, expect */
import React from "react";
import Toggle, { Toggle as TogglePure } from "./_Toggle";
import { shallow, mount } from "enzyme";

describe("(Component) Toggle", function() {
  test("[handleOnClick] should get the attribute and update the state", () => {
    const onChange = jest.fn();
    const comp = shallow(<TogglePure onChange={onChange} name="toggle" />);
    const inst = comp.instance();
    const event = {
      preventDefault: jest.fn()
    };

    const spy = jest.spyOn(inst, "setState");
    inst.handleOnClick(event, "Value1");
    expect(event.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ value: "Value1" }, expect.any(Function));
    expect(onChange).toHaveBeenCalledWith("Value1", {
      name: "toggle",
      initialValue: "",
      formValue: "Value1"
    });

    // Should not work when disabled
    comp.setProps({ disabled: true });
    inst.handleOnClick(event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  test("[componentDidUpdate] should update the state when the value changes", () => {
    const onChange = jest.fn();
    const comp = shallow(<TogglePure onChange={onChange} name="toggle" />);
    const inst = comp.instance();
    const spy = jest.spyOn(inst, "setState");
    comp.setProps({ value: "My value" });
    expect(spy).toHaveBeenCalled();
  });

  test("should match snapshots", () => {
    const comp = mount(
      <Toggle value="val1">
        <Toggle.Option value="val1">Value 1</Toggle.Option>
        <Toggle.Option value="val2">Value 2</Toggle.Option>
      </Toggle>
    );
    expect(comp).toMatchSnapshot();
  });
});
