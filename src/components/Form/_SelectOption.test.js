/* global describe, test, expect, jest */
import React from "react";
import SelectOption from "./_SelectOption";
import { mount } from "enzyme";

describe("(Component) SelectOption", () => {
  test("[select] should trigger the onClick prop", () => {
    const onClick = jest.fn();
    const event = {};

    const comp = mount(
      <SelectOption
        onClick={onClick}
        highlighted={true}
        selected={true}
        icon="ico ico-tutti-cube"
        text="my option"
      />
    );
    const inst = comp.instance();

    inst.select(event);
    expect(onClick).toHaveBeenCalledWith(inst.props, event);
    expect(comp).toMatchSnapshot();
  });

  test("[unselect] should trigger the onClose prop", () => {
    const onClose = jest.fn()
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    }

    const comp = mount(
      <SelectOption
        onClose={onClose}
        selected={false}
        icon="ico ico-tutti-cube"
        text="my option"
      />
    );
    const inst = comp.instance();

    inst.close(event);
    expect(onClose).toHaveBeenCalledWith(inst.props);
    expect(event.preventDefault).toHaveBeenCalled()
    expect(event.stopPropagation).toHaveBeenCalled()
  })
});
