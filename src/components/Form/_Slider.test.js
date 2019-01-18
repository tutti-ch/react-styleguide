/* global describe, test, expect, jest */
import React from "react";
import { mount, shallow } from "enzyme";
import { Slider } from "./_Slider";

describe("(Component) Slider", () => {
  test("[validate] should validate the props", () => {
    expect(() => Slider.validate({ name: "a", multiple: true })).toThrow(); // Should throw as it expects a name parameter.
  });

  test("[componentDidMount] should register a root element", done => {
    const comp = mount(<Slider min={1000} max={2000} />);
    const inst = comp.instance();
    inst.root = { offsetWidth: 500 };
    inst.refs.min = {
      getAttribute: jest.fn().mockReturnValue("min"),
      offsetWidth: 50
    };
    inst.refs.max = {
      getAttribute: jest.fn().mockReturnValue("max"),
      offsetWidth: 50
    };
    expect(inst.root).not.toBeUndefined();

    setTimeout(() => {
      expect(comp.state("min").position).toBe(0);
      expect(comp.state("max").position).toBe(90);

      inst.refs.min = undefined;
      inst.refs.max = undefined;
      inst.calculatePosition = jest.fn();
      inst.componentDidMount();

      setTimeout(() => {
        expect(inst.calculatePosition).not.toHaveBeenCalled();
        done();
      });
    });
  });

  test("[calculateMouseValue] should calculate the value at mouse position", () => {
    const comp = mount(<Slider name="hey" min={1000} max={2000} />);
    const inst = comp.instance();
    inst.calculateMousePosition = jest.fn().mockReturnValue(75);
    expect(inst.calculateMouseValue({})).toBe(1750);
    expect(inst.calculateMousePosition).toHaveBeenCalledWith({});
  });

  test("[calculatePosition] should calculate the position given a value", () => {
    const comp = mount(<Slider min={1000} max={2000} />);
    const inst = comp.instance();
    inst.root = { offsetWidth: 1000 };
    inst.target = {
      getAttribute: jest.fn().mockReturnValue("min"),
      offsetWidth: 50
    };
    expect(inst.calculatePosition(1500)).toBe(50);
    expect(inst.calculatePosition(1000)).toBe(0);
    expect(inst.calculatePosition(2000)).toBe(95); // Since thumbSize equals 5% of the size (1000 * 5/100 = 50)
    expect(inst.calculatePosition(1750)).toBe(75);
  });

  test("[calculateMousePosition] should give you the percentage of the mouse position", () => {
    const comp = mount(<Slider min={500} max={1500} />);
    const inst = comp.instance();
    inst.root = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        left: 500
      }),
      offsetWidth: 1000
    };

    expect(inst.calculateMousePosition({ clientX: 750 })).toBe(25);
    expect(inst.calculateMousePosition({ touches: [{ clientX: 1000 }] })).toBe(
      50
    );
  });

  describe("calculateClosestValue", () => {
    test("should return the closest step value", () => {
      const comp = mount(<Slider min={500} max={1500} step={250} />);
      const inst = comp.instance();
      expect(inst.calculateClosestValue(800)).toBe(750);
      expect(inst.calculateClosestValue(900)).toBe(1000);
      expect(inst.calculateClosestValue(1450)).toBe(1500);
      expect(inst.calculateClosestValue(10000)).toBe(1500);
      expect(inst.calculateClosestValue(100)).toBe(500);
      expect(inst.calculateClosestValue(501)).toBe(500);
      expect(inst.calculateClosestValue(625)).toBe(750);

      comp.setProps({
        min: undefined,
        max: undefined,
        step: 0.5,
        range: [
          { label: "1000", value: "1" },
          { label: "2000", value: "2.5" },
          { label: "3000", value: "5" },
          { label: "4000", value: "7.5" },
          { label: "5000", value: "10" }
        ]
      });

      inst.direction = "R";

      expect(inst.calculateClosestValue(6)).toBe(5);
      expect(inst.calculateClosestValue(7)).toBe(7.5);
      expect(inst.calculateClosestValue(9.9)).toBe(10);
      expect(inst.calculateClosestValue(1.9)).toBe(2.5);
    });

    test("should recursively find the previous value until minimum distance is satisfied", () => {
      const comp = mount(
        <Slider min={500} max={1500} step={250} minDistance={300} />
      );
      const inst = comp.instance();
      comp.setState({ max: { ...comp.state("max"), value: 1010 } });
      expect(inst.calculateClosestValue(1200, "min")).toBe(500);
      comp.setState({ max: { ...comp.state("max"), value: 1100 } });
      expect(inst.calculateClosestValue(1200, "min")).toBe(750);
      comp.setState({ min: { ...comp.state("min"), value: 640 } });
      expect(inst.calculateClosestValue(1200, "max")).toBe(1250);
      expect(inst.calculateClosestValue(750, "max")).toBe(1000);
    });
  });

  test("[handleExtremes] should set the value state to null if extremes provided", () => {
    const comp = mount(
      <Slider
        min={500}
        max={1500}
        step={250}
        minDistance={300}
        mouseThreshold={10}
        name={["a", "b"]}
        extremes
        multiple
      />
    );
    const inst = comp.instance();
    inst.target = {
      getAttribute: jest.fn().mockReturnValue("min"),
      offsetWidth: 10
    };
    expect(inst.handleExtremes(-100, { left: 10, right: 900 }, 910)).toBe(
      false
    );
    expect(inst.handleExtremes(-100, { left: 10, right: 900 }, 0)).toBe(false);
    expect(inst.handleExtremes(-100, { left: 10, right: 900 }, -1)).toBe(true);

    inst.target.getAttribute = jest.fn().mockReturnValue("max");

    expect(inst.handleExtremes(100, { left: 10, right: 900 }, 910)).toBe(false);
    expect(inst.handleExtremes(100, { left: 10, right: 900 }, 911)).toBe(true);
    expect(inst.handleExtremes(100, { left: 10, right: 900 }, 50)).toBe(false);

    comp.setProps({ extremes: false });
    expect(inst.handleExtremes(100, { left: 10, right: 900 }, 911)).toBe(false);
  });

  test("[handleMouseDown] should set the element that triggered the event and register variables", () => {
    const comp = mount(<Slider min={500} max={1500} step={250} />);
    const inst = comp.instance();

    const event = {
      target: {
        getAttribute: jest.fn().mockReturnValue("min"),
        classList: { remove: jest.fn() }
      }
    };
    const spy = jest.spyOn(window, "addEventListener");

    inst.handleMouseDown(event);
    expect(event.target.classList.remove).toHaveBeenCalled();
    expect(event.target.getAttribute).toHaveBeenCalledWith("data-name");
    expect(window.addEventListener).toHaveBeenCalledWith(
      "mouseup",
      inst.handleMouseUp
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      "touchend",
      inst.handleMouseUp
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      "mousemove",
      inst.handleMouseMove
    );
    spy.mockRestore();
  });

  test("[handleMouseUp] should remove the listeners and set the position of the element to the nearest step value", () => {
    const onChange = jest.fn();

    const comp = mount(
      <Slider min={500} max={1500} step={250} onChange={onChange} name="ps" />
    );
    const inst = comp.instance();
    const elem = {
      getAttribute: jest.fn().mockReturnValue("min"),
      classList: { add: jest.fn() }
    };

    comp.setState({
      min: { ...comp.state("min"), value: 770 }
    });
    inst.target = elem;
    const spy = jest.spyOn(window, "removeEventListener");

    inst.handleMouseUp();
    expect(elem.classList.add).toHaveBeenCalled();
    expect(comp.state("min").value).toBe(750);
    expect(onChange).toHaveBeenCalledWith(750, {
      name: "ps",
      initialValue: undefined,
      formValue: [750, NaN]
    });
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "mouseup",
      inst.handleMouseUp
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "touchend",
      inst.handleMouseUp
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "mousemove",
      inst.handleMouseMove
    );

    // In case extremes are specified, should return undefined
    inst.extremes = true;
    inst.setState = jest.fn();
    inst.handleMouseUp();
    expect(inst.setState).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  describe("handleMouseDown", () => {
    test("should setup the variables and event listeners", () => {
      const comp = mount(
        <Slider
          min={500}
          max={1500}
          values={[750, 1250]}
          step={250}
          minRange={100}
          name={["ps", "pe"]}
          multiple
        />
      );

      const inst = comp.instance();
      const window = global.window;
      const event = {
        target: {
          classList: { remove: jest.fn() },
          getAttribute: jest.fn().mockReturnValue("min")
        }
      };
      global.window.addEventListener = jest.fn();
      inst.handleMouseDown(event);
      expect(global.window.addEventListener).toHaveBeenCalledWith(
        "mouseup",
        inst.handleMouseUp
      );
      expect(global.window.addEventListener).toHaveBeenCalledWith(
        "touchend",
        inst.handleMouseUp
      );
      expect(global.window.addEventListener).toHaveBeenCalledWith(
        "mousemove",
        inst.handleMouseMove
      );
      global.window = window;
    });
  });

  describe("handleMouseMove", () => {
    test("should return undefined if extremes returns true", () => {
      const comp = mount(<Slider min={100} max={1000} />);
      const inst = comp.instance();
      inst.handleExtremes = jest.fn().mockReturnValue(true);
      inst.setState = jest.fn();
      inst.root = {
        getBoundingClientRect: jest
          .fn()
          .mockReturnValue({ left: 100, right: 500 }),
        offsetWidth: 1000
      };
      inst.target = {
        getAttribute: jest.fn().mockReturnValue("min"),
        offsetWidth: 50
      };
      expect(inst.handleMouseMove({})).toBeUndefined();
      expect(inst.setState).not.toHaveBeenCalled();
    });

    test("should return undefined if extremes returns true", () => {
      const comp = mount(<Slider min={100} max={1000} />);
      const inst = comp.instance();
      const event = { clientX: 51, preventDefault: jest.fn() };
      inst.handleExtremes = jest.fn().mockReturnValue(null);
      inst.validateThumbPosition = jest.fn().mockReturnValue(75);
      inst.setState = jest.fn();
      inst.calculateMouseValue = jest.fn();
      inst.clientX = 101;
      inst.root = {
        getBoundingClientRect: jest
          .fn()
          .mockReturnValue({ left: 100, right: 500 }),
        offsetWidth: 1000
      };
      inst.target = {
        getAttribute: jest.fn().mockReturnValue("min"),
        offsetWidth: 50
      };
      inst.handleMouseMove(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(inst.calculateMouseValue).toHaveBeenCalledWith(event);
      expect(inst.setState).toHaveBeenCalledWith({
        min: { input: undefined, position: 75, range: 100 }
      });
    });
  });

  test("[validateThumbPosition] should validate the thumb position and make sure everything is alright", () => {
    const comp = mount(<Slider min={100} max={1000} />);
    const inst = comp.instance();
    inst.setState({ max: { position: 40 }, min: { position: 20 } });
    inst.target = {
      getAttribute: jest.fn().mockReturnValue("min"),
      offsetWidth: 50
    };
    inst.root = { offsetWidth: 1000 };
    expect(inst.validateThumbPosition(50)).toBe(35);
    inst.target.getAttribute = jest.fn().mockReturnValue("max");
    expect(inst.validateThumbPosition(15)).toBe(25);
  });

  test("[getMaxRange] should return the max range", () => {
    const comp = mount(<Slider range={[{ value: 0 }, { value: 100 }]} />);
    const inst = comp.instance();
    expect(inst.getMaxRange()).toBe(100);
    comp.setProps({ range: undefined, max: 41, min: 20 });
    expect(inst.getMaxRange()).toBe(41);
  });

  test("[getMinRange] should return the min range", () => {
    const comp = mount(<Slider range={[{ value: 415 }, { value: 505 }]} />);
    const inst = comp.instance();
    expect(inst.getMinRange()).toBe(415);
    comp.setProps({ range: undefined, min: 411, max: 500 });
    expect(inst.getMinRange()).toBe(411);
  });

  test("[notifyParent] should return a callback that notifies the parent", () => {
    const comp = mount(
      <Slider min={100} max={500} values={[120, 450]} name="test" />
    );
    const inst = comp.instance();
    // It should work when there is no on change defined
    inst.notifyParent("min")();
    comp.setProps({ onChange: jest.fn() });
    inst.notifyParent("min")();
    expect(inst.props.onChange).toHaveBeenCalledWith(120, {
      formValue: [120, 450],
      initialValue: 120,
      name: "test"
    });
    inst.notifyParent("max")();
    expect(inst.props.onChange).toHaveBeenCalledWith(450, {
      formValue: [120, 450],
      initialValue: 450,
      name: "test"
    });
  });

  test("[componentDidUpdate] should set the state when name and/or values are changing", () => {
    const comp = mount(
      <Slider
        min={100}
        max={500}
        values={[120, 450]}
        name={["test", "test-max"]}
        multiple
      />
    );
    const inst = comp.instance();
    const spy = jest.spyOn(inst, "setState");
    inst.root = { offsetWidth: 540 };
    comp.setProps({ name: "new-name", values: [120, 450] });

    expect(spy).toMatchSnapshot();
  });

  describe("values null", () => {
    test("[isEmpty] should return empty when empty values are provided", () => {
      expect(Slider.isEmpty(null)).toBe(true);
      expect(Slider.isEmpty()).toBe(true);
      expect(Slider.isEmpty(1)).toBe(false);
      expect(Slider.isEmpty(NaN)).toBe(true);
    });

    test("[getFormattedValue] should return undefined when value is null", () => {
      const comp = mount(<Slider min={50} max={56} />);
      const inst = comp.instance();
      expect(inst.getFormattedValue()).toBeUndefined();
      comp.setProps({ step: 0.5 });
      expect(inst.getFormattedValue(10)).toBe("10.00");
      comp.setProps({ range: [{ value: "2.5", label: "Cabron" }] });
      expect(inst.getFormattedValue(2.5)).toBe("Cabron");
    });

    test("[calculatePosition] should return null when the value is null", () => {
      const comp = mount(<Slider min={100} max={150} />);
      const inst = comp.instance();
      expect(inst.calculatePosition(null)).toBe(null);
    });
  });

  describe("snapshots", () => {
    test("should create the right snapshot for single thumb", () => {
      const comp = mount(
        <Slider min={500} max={1500} step={250} values={[700]} />
      );
      expect(comp).toMatchSnapshot();
    });

    test("should create the right snapshot for multiple thumbs", () => {
      const comp = mount(
        <Slider
          min={500}
          max={1500}
          step={250}
          values={[700]}
          multiple
          name={["a", "b"]}
        />
      );
      expect(comp).toMatchSnapshot();
    });

    test("should create the right snapshot for decimals and steps specified", () => {
      const comp = mount(
        <Slider
          min={1}
          max={10}
          step={0.5}
          values={[2]}
          name={["c", "d"]}
          multiple
        />
      );
      expect(comp).toMatchSnapshot();

      comp.setProps({ name: ["pe", "ps"] });
      expect(comp).toMatchSnapshot();
    });
  });
});
