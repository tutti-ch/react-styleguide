/* global describe, test, expect, jest */
import React from "react";
import { mount } from "enzyme";
import { Select } from "./_Select";

describe("(Component) Select", () => {
  const getOptions = () => [
    { value: "React.js", text: "React.js" },
    { value: "Vue.js", text: "Vue.js" },
    { value: "Angular.js", text: "Angular.js" },
    { value: "jQuery", text: "jQuery" },
    { value: "Knockout", text: "Knockout" },
    { value: "Backbone", text: "Backbone" },
    { value: "Ember", text: "Ember" },
    { value: "Bootstrap", text: "Bootstrap" },
    { value: "Other", text: "Other" }
  ];

  // test("[componentDidUpdate] should update the state when the component receives new props", () => {
  //   const options = getOptions();
  //   const comp = mount(<Select options={options} selected="jQuery" />);
  //   expect(comp.state("selected")).toEqual(["jQuery"]);

  //   const spy = jest.spyOn(comp.instance(), "sortOptions");
  //   comp.setProps({ selected: ["jQuery", "Ember"], multiple: true });

  //   expect(comp.state("selected")).toEqual(["jQuery", "Ember"]);
  //   expect(spy).not.toHaveBeenCalled();

  //   comp.setProps({
  //     options: [{ value: "NewF.js", text: "New Framework" }],
  //     sort: true
  //   });
  //   expect(spy).toHaveBeenCalled();

  //   const setStateSpy = jest.spyOn(comp.instance(), "setState");
  //   comp.setProps({});
  //   expect(setStateSpy).not.toHaveBeenCalled();

  //   comp.setProps({ options, sort: false, selected: "React.js" });
  //   expect(setStateSpy).toHaveBeenCalledWith({
  //     highlighted: -1,
  //     selected: ["React.js"],
  //     options: options
  //   });
  // });

  test("[componentDidUpdate] should handle highlighted state", () => {
    const options = getOptions();
    const comp = mount(<Select options={options} selected="jQuery" />);

    expect(comp.state("selected")).toEqual(["jQuery"]);
    expect(comp.state("highlighted")).toBe(3);
    const newOptions = getOptions();

    newOptions[3].value = "nojQuery";
    comp.setProps({
      options: newOptions,
      selected: undefined
    });
    expect(comp.state("highlighted")).toBe(-1);
    expect(comp.state("selected")).toEqual([]);
  });

  test("[componentDidUpdate] should disable highlighted state when multiline", () => {
    const options = getOptions();
    const comp = mount(<Select options={options} selected="jQuery" />);

    comp.setProps({
      selected: ["Ember"],
      multiple: true
    });

    expect(comp.state("selected")).toEqual(["Ember"]);
    expect(comp.state("highlighted")).toBe(-1); // does not support multiple
  });

  test("[handleArrowDown/handleArrowUp] should increase/decrease the highlight index", () => {
    const options = getOptions();
    const comp = mount(<Select options={options} sort />);
    const inst = comp.instance();
    expect(comp.state("highlighted")).toBe(-1);
    inst.handleArrowDown();
    expect(comp.state("highlighted")).toBe(0);
    inst.handleArrowDown();
    expect(comp.state("highlighted")).toBe(1);
    inst.handleArrowUp();
    expect(comp.state("highlighted")).toBe(0);
    inst.handleArrowUp();
    expect(comp.state("highlighted")).toBe(0);
    comp.setState({ highlighted: options.length - 1 });
    inst.handleArrowDown();
    inst.handleArrowDown();
    expect(comp.state("highlighted")).toBe(options.length - 1);
  });

  test("[handleKeyDown] should handle several keys", () => {
    const options = getOptions();
    const comp = mount(
      <Select options={options} selected={["jQuery", "Ember"]} sort />
    );
    const inst = comp.instance();

    comp.setState({ highlighted: 1 });

    const event = {
      key: "ArrowDown",
      preventDefault: jest.fn()
    };

    inst.handleArrowUp = jest.fn();
    inst.handleArrowDown = jest.fn();
    inst.select = jest.fn();
    const spy = jest.spyOn(inst, "open");

    // The first stroke should open the options
    inst.keyDown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(inst.handleArrowDown).not.toHaveBeenCalled();

    inst.keyDown(event);
    expect(inst.handleArrowDown).toHaveBeenCalled();

    event.key = "Up";
    inst.keyDown(event);
    expect(inst.handleArrowUp).toHaveBeenCalled();

    event.key = "Enter";
    inst.keyDown(event);
    expect(inst.select).toHaveBeenCalledWith(options[1], event);
    expect(spy).toHaveBeenCalledTimes(1);

    event.key = "Esc";
    inst.keyDown(event);
    expect(comp.state("isOpen")).toBe(false);
  });

  test("[open] should set the state", () => {
    const options = getOptions();
    const comp = mount(
      <Select options={options} selected={["jQuery", "Ember"]} disabled />
    );
    const inst = comp.instance();

    inst.open();
    expect(comp.state("isOpen")).toBe(false);
    comp.setProps({ disabled: false });
    inst.open();
    expect(comp.state("isOpen")).toBe(true);
  });

  test("[close] should set the state", () => {
    const options = getOptions();
    const comp = mount(
      <Select options={options} selected={["jQuery", "Ember"]} />
    );
    const inst = comp.instance();
    const spy = jest.spyOn(inst, "setState");

    inst.close();
    expect(comp.state("isOpen")).toBe(false);
    expect(spy).not.toHaveBeenCalled();
    inst.open();
    inst.close();
    expect(comp.state("isOpen")).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  test("[toggle] should set the state", () => {
    const options = getOptions();
    const comp = mount(
      <Select options={options} selected={["jQuery", "Ember"]} />
    );
    const inst = comp.instance();

    expect(comp.state("isOpen")).toBe(false);
    inst.toggle();
    expect(comp.state("isOpen")).toBe(true);
    inst.toggle();
    expect(comp.state("isOpen")).toBe(false);
  });

  test("[select] should select the given value and set the highlighted item", () => {
    const options = getOptions();
    const comp = mount(<Select options={options} selected="Ember" />);
    const inst = comp.instance();

    expect(inst.props.options).toEqual(options);
    expect(comp.state("selected")).toEqual(["Ember"]);
    expect(inst.findIndexByValue("Ember")).toBe(6);
    expect(comp.state("highlighted")).toBe(6);
    inst.select({ value: "jQuery" });
    expect(comp.state("selected")).toEqual(["jQuery"]);
    expect(comp.state("highlighted")).toBe(3);
  });

  test("[select] should select the given value and set the highlighted item - multiple", () => {
    const options = getOptions();
    const onChange = jest.fn();
    const comp = mount(
      <Select
        options={options}
        onChange={onChange}
        selected={["Ember"]}
        name="favs"
        multiple
      />
    );
    const inst = comp.instance();
    const event = { stopPropagation: jest.fn() };

    expect(inst.props.options).toEqual(options);
    expect(comp.state("selected")).toEqual(["Ember"]);
    expect(inst.findIndexByValue("Ember")).toBe(6);
    expect(comp.state("highlighted")).toBe(-1); // Multiples are not highlighted
    inst.select({ value: "jQuery" }, event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(comp.state("selected")).toEqual(["Ember", "jQuery"]);
    expect(comp.state("highlighted")).toBe(-1);
    expect(onChange).toHaveBeenCalledWith(["Ember", "jQuery"], {
      name: "favs",
      initialValue: ["Ember"],
      formValue: ["Ember", "jQuery"]
    });
    inst.select({ value: "jQuery" }, event);
    expect(comp.state("selected")).toEqual(["Ember"]);
    expect(comp.state("highlighted")).toBe(-1);
    expect(onChange).toHaveBeenCalledWith(["Ember"], {
      name: "favs",
      initialValue: ["Ember"],
      formValue: ["Ember"]
    });
  });

  test("[handleOnFocus/handleOnBlur] should add/remove the listener", () => {
    const comp = mount(<Select options={[]} />);
    const inst = comp.instance();

    const spyAdd = jest.spyOn(document, "addEventListener");
    const spyRem = jest.spyOn(document, "removeEventListener");

    inst.handleOnFocus();
    expect(spyAdd).toHaveBeenCalledWith("keydown", inst.keyDown);
    expect(comp.state().isFocused).toBe(true);

    inst.handleOnBlur();
    expect(spyRem).toHaveBeenCalledWith("keydown", inst.keyDown);
    expect(comp.state().isFocused).toBe(false);
  });

  test("[componentDidUpdate] should remove the listener if not focused", () => {
    const comp = mount(<Select options={[]} />);

    const spyRem = jest.spyOn(document, "removeEventListener");
    spyRem.mockClear();

    // if focused, we should not remove the event listener
    comp.setState({ isFocused: true });
    expect(spyRem).toHaveBeenCalledTimes(0);

    comp.setState({ isFocused: false });
    expect(spyRem).toHaveBeenCalledTimes(1);
  });

  test("[componentWillUnmount] should remove the listener", () => {
    const comp = mount(<Select options={[]} />);
    const inst = comp.instance();

    const spyRem = jest.spyOn(document, "removeEventListener");
    spyRem.mockClear();

    // causing a component update
    expect(spyRem).toHaveBeenCalledTimes(0);
    inst.componentWillUnmount();
    expect(spyRem).toHaveBeenCalledTimes(1);
  });

  test("[getSelectedOptions] should return the selected options or the placeholder if given", () => {
    const options = getOptions();
    const comp = mount(
      <Select options={options} selected={["React.js", "jQuery"]} multiple />
    );
    const inst = comp.instance();

    expect(inst.getSelectedOptions()).toEqual([options[0], options[3]]);
    comp.setProps({ placeholder: "my-placeholder", selected: [] });
    expect(inst.getSelectedOptions()).toEqual([
      { text: "my-placeholder", value: null }
    ]);

    expect(comp).toMatchSnapshot();
  });

  test("[unselect] should unselect the given value", () => {
    const onChange = jest.fn();
    const options = getOptions();
    const comp = mount(
      <Select
        options={options}
        selected={["React.js", "jQuery"]}
        multiple
        onChange={onChange}
      />
    );
    const inst = comp.instance();

    inst.unselect({ value: "React.js" });
    expect(comp.state("selected")).toEqual(["jQuery"]);
    inst.unselect({ value: "Ember" });
    expect(comp.state("selected")).toEqual(["jQuery"]);
    expect(onChange).toHaveBeenCalledWith(["jQuery"], {
      initialValue: ["jQuery"],
      name: undefined
    });
  });

  test("[resetSelected] should reset selected state", () => {
    const onChange = jest.fn();
    const options = getOptions();
    const comp = mount(
      <Select
        options={options}
        selected={["React.js", "jQuery"]}
        multiple
        onChange={onChange}
      />
    );
    const inst = comp.instance();

    inst.resetSelected();
    expect(comp.state("selected")).toEqual([]);
    expect(onChange).toHaveBeenCalledWith(null, {
      name: undefined,
      initialValue: ["React.js", "jQuery"]
    });
  });

  test("[snapshot] should match", () => {
    const options = getOptions();
    const comp = mount(<Select options={options} selected={["jQuery"]} />);
    expect(comp).toMatchSnapshot();
  });
});
