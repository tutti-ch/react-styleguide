/* global describe, test, expect, jest */
import React from "react"
import { mount } from "enzyme"
import { Input, Checkbox } from "../Form"

describe("HOC (WithWrapper)", () => {
  test("[handleOnChange] should set a hasValue and call the onChange prop", () => {
    // The Input is actually wrapped in a HOC
    const spy = jest.fn()
    const comp = mount(<Input onChange={spy} value="hey"/>)
    const inst = comp.instance()

    inst.handleOnChange("some value")
    expect(comp.state("hasValue")).toBe(true)
    expect(spy).toHaveBeenCalled()
    comp.setProps({ onChange: undefined })
    inst.handleOnChange("")
    expect(comp.state("hasValue")).toBe(false)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  describe("snapshot", () => {
    test("should include a label span when label is not defined in the child component", () => {
      const comp = mount(<Input label="My awesome label" value="hello-world"/>)
      expect(comp).toMatchSnapshot()
    })

    test("should not include a label span when the label is defined in the child component", () => {
      const comp = mount(<Checkbox checked/>)
      expect(comp).toMatchSnapshot()
    })

    test("should display an error span when there is an error", () => {
      const comp = mount(<Checkbox checked error="Cannot proceed like this"/>)
      expect(comp).toMatchSnapshot()
    })
  })
})