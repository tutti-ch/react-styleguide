/* global describe, test, expect, jest */
import React from "react"
import { Input } from "./_Input"
import { shallow, mount } from "enzyme"

describe("(Component) Input", () => {
  test("[componentWillReceiveProps] should sync the state with props", () => {
    const comp = shallow(<Input/>)
    const inst = comp.instance()
    inst.componentWillReceiveProps({ value: "Frocello" })
    expect(comp.state("value")).toBe("Frocello")
  })

  test("[handleChange] should set the value and call the onChange from parent", () => {
    const spy = jest.fn()
    const comp = shallow(<Input onChange={spy}/>)
    const inst = comp.instance()
    inst.handleChange({ target: { value: "Moreno" } })
    expect(comp.state("value")).toBe("Moreno")
    expect(spy).toHaveBeenCalled()

    comp.setProps({ onChange: undefined })
    inst.handleChange({ target: { value: "Moreno" } })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test("snapshot", () => {
    const comp = mount(<Input value="Life is good" type="text"/>)
    expect(comp).toMatchSnapshot()
  })
})
