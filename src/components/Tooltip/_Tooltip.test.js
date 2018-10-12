/* global describe, test, jest, expect, beforeEach */
import React from "react";
import Tooltip from "./_Tooltip";
import { mount } from "enzyme";

describe("(Components) Tooltip", () => {
  test("should first render null then after APPEAR_AFTER should appear and close when clicked on the X", async done => {
    Tooltip.APPEAR_AFTER = 0;
    const tooltipName = "my-tooltip";
    const comp = mount(
      <Tooltip arrowPosition={"tl"} name={tooltipName}>
        My super tooltip
      </Tooltip>
    );
    const inst = comp.instance();
    const spy = jest.spyOn(inst, "close");

    // Initially render is null
    expect(comp.html()).toBe(null);

    // Let's wait till componentDidMount resolves
    await inst.componentDidMount();

    // Update the render
    comp.update();
    expect(comp).toMatchSnapshot();

    // Now let's close the tooltip
    comp
      .find("Close")
      .at(0)
      .closest("div")
      .simulate("click");

    expect(spy).toHaveBeenCalled();

    // Let's wait till close resolves
    await inst.close();
    // Update the render
    comp.update();
    expect(window.localStorage.getItem(tooltipName)).toEqual("set");
    expect(comp).toMatchSnapshot();

    done();
  });

  test("render should be null when user already clicked on close for the tooltip", async done => {
    const tooltipName = "my-tooltip";

    const comp = mount(
      <Tooltip arrowPosition={"tl"} name={tooltipName}>
        My super tooltip
      </Tooltip>
    );
    const inst = comp.instance();

    // Initially render is null
    expect(comp.html()).toBe(null);

    // Let's wait till componentDidMount resolves
    await inst.componentDidMount();

    // Update the render
    comp.update();

    // And should be still null.
    expect(comp.html()).toBe(null);
    done();
  });

  test("on unmount should set a flag so that setState does not get called after unmount", () => {
    const comp = mount(
      <Tooltip arrowPosition={"tl"} name={"lorem ipsum"}>
        My super tooltip
      </Tooltip>
    );
    const inst = comp.instance();
    inst.componentWillUnmount();
    expect(inst.unmounted).toBe(true);
  });
});
