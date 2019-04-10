/* global describe, it, expect, jest */
import React from "react";
import { shallow, mount } from "enzyme";
import OutsideClickable from "./index";

describe("(Component) OutsideClickable", () => {
  it("should detect outside click", () => {
    const myEvent = jest.fn();
    let div;

    const comp = mount(
      <OutsideClickable onOutsideClick={myEvent}>
        <div ref={n => (div = n)}>My element</div>
      </OutsideClickable>
    );

    // It should detect the outside click
    document.body.click();
    expect(myEvent.mock.calls.length).toBe(1);

    // It should not call the function when clicked inside
    div.click();
    expect(myEvent.mock.calls.length).toBe(1);

    comp.unmount();

    // It should not detect the outside click anymore since we have unmounted the component
    document.body.click();
    expect(myEvent.mock.calls.length).toBe(1);
  });

  it("should throw an error if it receives multiple children", () => {
    const myEvent = jest.fn();
    let error;

    try {
      const comp = shallow(
        <OutsideClickable onOutsideClick={myEvent}>
          <div>First child</div>
          <div>Second child</div>
        </OutsideClickable>
      );
    } catch (e) {
      error = e;
    }

    expect(() => comp).toThrowError();
  });
});
