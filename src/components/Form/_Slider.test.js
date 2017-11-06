/* global describe, test, expect, jest */
import React from "react"
import { mount } from "enzyme"
import { Slider } from "./_Slider"

describe("(Component) Slider", () => {
  test("[componentDidMount] should register a root element", () => {
    const comp = mount(<Slider min={1000} max={2000}/>)
    const inst = comp.instance()
    expect(inst.root).not.toBeUndefined()
  })

  test("[calculatePosition] should calculate the position given a value", () => {
    const comp = mount(<Slider min={1000} max={2000}/>)
    const inst = comp.instance()
    expect(inst.calculatePosition(1500)).toBe(50)
    expect(inst.calculatePosition(1000)).toBe(0)
    expect(inst.calculatePosition(2000)).toBe(100)
    expect(inst.calculatePosition(1750)).toBe(75)
  })

  test("[calculateMousePosition] should give you the percentage of the mouse position", () => {
    const comp = mount(<Slider min={500} max={1500}/>)
    const inst = comp.instance()
    inst.root = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        left: 500,
      }),
      offsetWidth: 1000,
    }

    expect(inst.calculateMousePosition({ clientX: 750 })).toBe(25)
    expect(inst.calculateMousePosition({ touches: [{ clientX: 1000 }] })).toBe(50)
  })

  test("[calculateClosestValue] should return the closest step value", () => {
    const comp = mount(<Slider min={500} max={1500} step={250}/>)
    const inst = comp.instance()
    comp.setState({ minValue: 800 })
    expect(inst.calculateClosestValue("minValue")).toBe(750)
    comp.setState({ minValue: 650 })
    expect(inst.calculateClosestValue("minValue")).toBe(750)
    comp.setState({ minValue: 1450 })
    expect(inst.calculateClosestValue("minValue")).toBe(1500)
    comp.setState({ minValue: 100000 }) // This should never happen but still let's try
    expect(inst.calculateClosestValue("minValue")).toBe(1500)
    comp.setState({ minValue: 100 }) // This should never happen but still let's try
    expect(inst.calculateClosestValue("minValue")).toBe(500)
  })

  test("[handleMouseDown] should set the element that triggered the event and register variables", () => {
    const comp = mount(<Slider min={500} max={1500} step={250}/>)
    const inst = comp.instance()
    expect(comp.state("dragging")).toBe(false)

    const event = { target: { classList: { remove: jest.fn() } } }
    const spy = jest.spyOn(window, "addEventListener")

    inst.handleMouseDown(event)
    expect(event.target.classList.remove).toHaveBeenCalled()
    expect(comp.state("dragging")).toBe(event.target)
    expect(window.addEventListener).toHaveBeenCalledWith("mouseup", inst.handleMouseUp)
    expect(window.addEventListener).toHaveBeenCalledWith("touchend", inst.handleMouseUp)
    expect(window.addEventListener).toHaveBeenCalledWith("mousemove", inst.handleMouseMove)
    spy.mockRestore()
  })

  test("[handleMouseUp] should remove the listeners and set the position of the element to the nearest step value", () => {
    const comp = mount(<Slider min={500} max={1500} step={250}/>)
    const inst = comp.instance()
    const elem = {
      getAttribute: jest.fn().mockReturnValue("minValue"),
      classList: { add: jest.fn() },
    }

    comp.setState({ dragging: elem, minValue: 770 })
    const spy = jest.spyOn(window, "removeEventListener")

    inst.handleMouseUp()
    expect(elem.classList.add).toHaveBeenCalled()
    expect(comp.state("dragging")).toBe(false)
    expect(comp.state("minValue")).toBe(750)
    expect(window.removeEventListener).toHaveBeenCalledWith("mouseup", inst.handleMouseUp)
    expect(window.removeEventListener).toHaveBeenCalledWith("touchend", inst.handleMouseUp)
    expect(window.removeEventListener).toHaveBeenCalledWith("mousemove", inst.handleMouseMove)
    spy.mockRestore()
  })

  test("[handleMouseMove] should move the element to the mouse position", () => {
    const comp = mount(<Slider min={500} max={1500} step={250} minRange={100}/>)
    const inst = comp.instance()
    const elem = { getAttribute: jest.fn().mockReturnValue("minValue") }
    const event = { preventDefault: jest.fn(), clientX: 570 }
    inst.root = { getBoundingClientRect: jest.fn().mockReturnValue({ left: 470 }), offsetWidth: 1000 }
    comp.setState({ dragging: elem, minValue: 550, maxValue: 750 })

    inst.handleMouseMove(event)
    expect(comp.state("minValue")).toBe(500)

    // Should not let continue when minValue > maxValue - range
    comp.setState({ minValue: 550, maxValue: 650 })
    inst.calculateMousePosition = jest.fn().mockReturnValue(75)
    inst.handleMouseMove(event)
    expect(comp.state("minValue")).toBe(550) // Should remain the same

    elem.getAttribute = jest.fn().mockReturnValue("maxValue")
    inst.handleMouseMove(event)
    expect(comp.state("minValue")).toBe(550)
    expect(comp.state("maxValue")).toBe(1250)

    // The preventDefault should be called every time until now
    expect(event.preventDefault).toHaveBeenCalledTimes(3)
    // Now lets set clientX to undefined to simulate a touch event
    delete event.clientX

    // In this case minValue can be greater than maxValue
    comp.setProps({ crossThumbs: true })
    comp.setState({ minValue: 550, maxValue: 650 })
    elem.getAttribute = jest.fn().mockReturnValue("minValue")
    inst.calculateMousePosition = jest.fn().mockReturnValue(75)
    inst.handleMouseMove(event)
    expect(comp.state("minValue")).toBe(1250)
    expect(event.preventDefault).toHaveBeenCalledTimes(3)

    // Here the mouse value should be greater than max, so we won't call the setState fn
    const stateSpy = jest.spyOn(inst, "setState")
    inst.calculateMousePosition = jest.fn().mockReturnValue(150)
    inst.handleMouseMove(event)
    expect(stateSpy).not.toHaveBeenCalled()
  })

  test("[renderThumb] should choose the correct name for inputs", () => {
    const comp = mount(<Slider min={500} max={1500} step={250} minRange={100} name={["pe", "ps"]} multiple/>)
    const inst = comp.instance()

    expect(mount(<div>{inst.renderThumb("maxValue")}</div>).find("input").prop("name")).toBe("ps")
    expect(mount(<div>{inst.renderThumb("minValue")}</div>).find("input").prop("name")).toBe("pe")

    comp.setProps({ name: "my-name" })
    expect(mount(<div>{inst.renderThumb("minValue")}</div>).find("input").prop("name")).toBe("my-name")
    expect(mount(<div>{inst.renderThumb("maxValue")}</div>).find("input").prop("name")).toBe("my-name")
  })

  test("[handleOnChange] should inform the parent when there is a change on the input", () => {
    const onChange = jest.fn()
    const comp = mount(<Slider min={500} max={1500} step={250} minValue={1000} name={["pe", "ps"]} onChange={onChange}
                               multiple/>)
    const inst = comp.instance()

    inst.handleOnChange("pe", 1000)({ target: { value: 750 } })
    expect(onChange).toHaveBeenCalledWith(750, { name: "pe", initialValue: 1000 })
  })

  describe("snapshots", () => {
    test("should create the right snapshot for single thumb", () => {
      const comp = mount(<Slider min={500} max={1500} step={250} minRange={100}/>)
      expect(comp).toMatchSnapshot()
    })

    test("should create the right snapshot for multiple thumbs", () => {
      const comp = mount(<Slider min={500} max={1500} step={250} minRange={100} multiple/>)
      expect(comp).toMatchSnapshot()
    })

    test("should create the right snapshot for decimals and steps specified", () => {
      const comp = mount(<Slider min={1} max={10} step={0.5} minRange={1} decimals={2} multiple/>)
      expect(comp).toMatchSnapshot()
    })
  })
})
