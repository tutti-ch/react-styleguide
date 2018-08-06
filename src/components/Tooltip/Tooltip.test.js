/* global describe, test, jest, expect, beforeEach */
import React from "react";
import { mount } from "enzyme";
import Tooltip from "./Tooltip";

describe("(Styleguide) Tooltip", () => {
  test("should mount", () => {
    const comp = mount(<Tooltip />);
    expect(comp).toMatchSnapshot();
  });

  test("changeArrow should update the state", () => {
    const comp = mount(<Tooltip />);
    const inst = comp.instance();
    const spy = jest.spyOn(inst, "setState");
    inst.changeArrow("rt");
    expect(spy).toHaveBeenCalledWith({ selectedArrow: "rt" });
  })
});
