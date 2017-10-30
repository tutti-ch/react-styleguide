/* global describe, test, expect, jest */
import React from "react"
import SelectOption from "./_SelectOption"
import { mount } from "enzyme"

describe("(Component) SelectOption", () => {
  test("[select] should trigger the onClick prop", () => {
    const onClick = jest.fn()
    const event = {}

    const comp = mount(
      <SelectOption
        onClick={onClick}
        highlighted={true}
        selected={true}
        icon="ico ico-tutti-cube"
        text="my option"/>
    )
    const inst = comp.instance()

    inst.select(event)
    expect(onClick).toHaveBeenCalledWith(inst.props, event)
    expect(comp).toMatchSnapshot()
  })
})