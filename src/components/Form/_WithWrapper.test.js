/* global describe, test, expect, jest */
import React from "react";
import { mount } from "enzyme";
import Form from "../Form";

describe("HOC (WithWrapper)", () => {
  test("[handleOnKeyup] should reset the error state", () => {
    const onKeyUp = jest.fn();
    const comp = mount(
      <Form.Input onChange={spy} value="hey" error="asdas" onKeyUp={onKeyUp} />
    );
    const inst = comp.instance();
    const spy = jest.spyOn(inst, "setState");
    inst.handleOnKeyup({});
    expect(spy).toHaveBeenCalledWith({ error: null });
    expect(onKeyUp).toHaveBeenCalledWith({});
    comp.setProps({ onKeyUp: undefined, error: undefined });
    inst.handleOnKeyup({});
    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  test("[handleOnChange] should set a hasValue and call the onChange prop", () => {
    // The Input is actually wrapped in a HOC
    const spy = jest.fn();
    const comp = mount(<Form.Input onChange={spy} value="hey" />);
    const inst = comp.instance();

    inst.handleOnChange("some value", { formValue: "some value" });
    expect(comp.state("formValue")).toBe("some value");
    expect(spy).toHaveBeenCalled();
    comp.setProps({ onChange: undefined });
    inst.handleOnChange("");
    expect(comp.state("formValue")).toBe(undefined);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("hasValue gets updated when new props arrive", () => {
    const comp = mount(<Form.Input />);
    expect(comp.find(".hasValue").exists()).toBe(false);
    comp.setProps({ value: "hey" });
    expect(comp.state("formValue")).toBe("hey");
  });

  test("Handles initialvalues for Form.Select", () => {
    const options = [
      {
        value: "blue",
        text: "Blue"
      },
      {
        value: "red",
        text: "Red"
      }
    ];
    const comp = mount(
      <Form.Select name="color" selected="blue" options={options} />
    );
    expect(comp.find(".hasValue").exists()).toBe(true);
    expect(comp.state("formValue")).toBe("blue");
  });

  describe("snapshot", () => {
    test("should include a label span when label is not defined in the child component", () => {
      const comp = mount(
        <Form.Input label="My awesome label" value="hello-world" />
      );
      expect(comp).toMatchSnapshot();
    });

    test("should not include a label span when the label is defined in the child component", () => {
      const comp = mount(<Form.Checkbox checked />);
      expect(comp).toMatchSnapshot();
    });

    test("should display an error span when there is an error", () => {
      const comp = mount(
        <Form.Checkbox checked error="Cannot proceed like this" />
      );
      expect(comp).toMatchSnapshot();
    });
  });
});
