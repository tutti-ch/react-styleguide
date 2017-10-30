/* global describe, test, expect */
import React from "react"
import InputRadioGroup from "./_InputRadioGroup"
import { InputRadio } from "./_InputRadio"
import { mount } from "enzyme"

describe("(Component) InputRadioGroup", () => {
  test("should handle the change of the children states", () => {
    const comp = mount(
      <InputRadioGroup>
        <InputRadio label="React.js" />
        <InputRadio label="Vue.js" checked/>
        <InputRadio label="Angular.js" />
      </InputRadioGroup>,
    )

    expect(comp.state("selected")).toBe(1) // The index of the selected radio

    comp.instance().handleOnChange(2)()
    expect(comp.state("selected")).toBe(2)

    comp.update()
    expect(comp).toMatchSnapshot()
  })
})