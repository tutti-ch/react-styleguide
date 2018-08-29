/* global describe, test, beforeEach, expect, jest */
import React from "react";
import Image from "./index";
import { mount } from "enzyme";
import * as generic from "../../styles/Icons/assets/generic";
jest.mock("../../styles/Icons/assets/generic");

describe("(Component) Image", () => {
  let comp, mock;
  const initialSrc = "https://tutti.ch/my-icon.jpg";

  beforeAll(() => {
    // mock TuttiCube for snaphots
    mock = generic.TuttiCube.mockImplementation(() => <svg />);
  });

  beforeEach(() => {
    comp = mount(<Image src={initialSrc} />);
    comp.setState({ loaded: true });
  });

  afterAll(() => {
    mock.mockReset();
  });

  test("snapshot should pass all props down", () => {
    const tree = mount(<Image src={initialSrc} />);
    const inst = tree.instance();
    inst.onLoad();
    expect(tree).toMatchSnapshot();
    inst.onError();
    expect(tree).toMatchSnapshot();
  });

  test("should render the image when loaded", () => {
    comp.setProps({ draggable: false });
    expect(comp.find("img[draggable]").exists()).toBe(true);
  });

  test("should render tutti cube on error", () => {
    // Simulate on error as the image-mock we have blocks
    // dom onError to be triggered.
    comp.instance().onError();
    comp.update();

    expect(comp.find("img").exists()).toBe(false);
    expect(comp.find("svg").exists()).toBe(true);

    // It should revert on load
    comp.instance().onLoad();
    comp.update();

    expect(comp.find("img").exists()).toBe(true);
    expect(comp.find("svg").exists()).toBe(false);
  });

  test("should always trigger callbacks", () => {
    const img = mount(<Image src="my-image" />);
    const inst = img.instance();
    expect(inst.state.loaded).toBe(true);
  });

  test("should trigger callbacks when the prop src is updated", () => {
    const instance = comp.instance();
    expect(instance.image.src).toBe(initialSrc);
    instance.componentWillReceiveProps({ src: "my-src.jpg" });
    expect(instance.image.src).toBe("my-src.jpg");

    // The result shoult be the same because we did not change the
    // props.src (it is still the initialOne)
    instance.componentWillReceiveProps({ src: initialSrc });
    expect(instance.image.src).toBe("my-src.jpg");
  });

  test("remove callbacks when component is unmounted", () => {
    const instance = comp.instance();
    expect(instance.image.onload).toBeInstanceOf(Function);
    expect(instance.image.onerror).toBeInstanceOf(Function);

    comp.unmount();
    expect(instance.image.onload).toBeUndefined();
    expect(instance.image.onerror).toBeUndefined();
  });

  test("shows a spinner if spinner size is defined", () => {
    comp.setState({ loaded: false });
    comp.setProps({ spinnerSize: 100 });
    comp.update();
    expect(comp.find("Spinner").length).toBe(1);
  });

  test("should render null when spinner is empty", () => {
    comp.setState({ error: false, loaded: false });
    expect(comp.instance().renderSpinner()).toBe(null);
  });
});
