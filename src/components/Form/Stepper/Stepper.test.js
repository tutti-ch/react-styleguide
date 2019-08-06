import React from "react";
import { mount } from "enzyme";

import Stepper from "./_Stepper";
import { roundValue } from "./helpers";

describe("(component) Stepper", () => {
  test("Can increment values", () => {
    const wrapper = mount(<Stepper step={0.5} min={0} max={2} id="rooms" />);
    const increase = wrapper.find(".increase");

    increase.simulate("click");
    expect(wrapper.find(".input").prop("value")).toEqual(0.5);

    increase.simulate("click");
    increase.simulate("click");
    increase.simulate("click");

    expect(wrapper.find(".input").prop("value")).toEqual(2);

    // increment more, should not be possible due to limit
    increase.simulate("click");
    increase.simulate("click");
    expect(wrapper.find(".input").prop("value")).toEqual(2);
  });

  test("Can decrement values", () => {
    const wrapper = mount(
      <Stepper step={1} min={0} max={2} id="rooms" value={2} />
    );
    const decrease = wrapper.find(".decrease");
    decrease.simulate("click");
    expect(wrapper.find(".input").prop("value")).toEqual(1);

    decrease.simulate("click");
    expect(wrapper.find(".input").prop("value")).toEqual(0);

    // can't go below minimum
    decrease.simulate("click");
    decrease.simulate("click");
    expect(wrapper.find(".input").prop("value")).toEqual(0);
  });

  test("Can change values", () => {
    const wrapper = mount(
      <Stepper step={0.5} min={0} max={5} id="rooms" value={2} />
    );
    const input = wrapper.find(".input");

    input.simulate("change", { target: { value: 2.5 } });
    input.simulate("blur");
    // Have to use wrapper.find again instead of input instance as it doesn't get updated
    expect(wrapper.find(".input").prop("value")).toEqual(2.5);

    input.simulate("change", { target: { value: "asdf" } });
    input.simulate("blur");
    expect(wrapper.find(".input").prop("value")).toEqual(0);

    input.simulate("change", { target: { value: 0.5 } });
    input.simulate("blur");
    expect(wrapper.find(".input").prop("value")).toEqual(0.5);

    input.simulate("change", { target: { value: -1 } });
    input.simulate("blur");
    expect(wrapper.find(".input").prop("value")).toEqual(0);

    input.simulate("change", { target: { value: 99 } });
    input.simulate("blur");
    expect(wrapper.find(".input").prop("value")).toEqual(5);
  });

  describe("(function) roundValue", () => {
    test("Returns correct numbers for every step", () => {
      // 0.5 steps
      expect(roundValue(5.5, 0.5)).toBe(5.5);
      expect(roundValue(5, 0.5)).toBe(5);
      expect(roundValue(0, 0.5)).toBe(0);

      // 0.6 steps
      expect(roundValue(1.8, 0.6)).toBe(1.8);
      expect(roundValue(1.9, 0.6)).toBe(1.8);

      // 1 steps
      expect(roundValue(2, 1)).toBe(2);
      expect(roundValue(0, 1)).toBe(0);
    });
  });
});
