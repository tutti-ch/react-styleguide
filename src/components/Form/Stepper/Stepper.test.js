import React from "react";
import { mount } from "enzyme";

import Stepper from "./Stepper";

describe("(component) Stepper", () => {
  test("Can increment values", () => {
    const wrapper = mount(<Stepper step={0.5} min={0} max={5} />);
    console.log(wrapper.debug());
    wrapper.find(".increase").simulate("click");
    expect(wrapper.find(".input").value).toEqual(0.5);
  });
});
