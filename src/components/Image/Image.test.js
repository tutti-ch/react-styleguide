/* global describe, test, beforeEach, expect, jest */
import React from "react";
import Image from "components/Image";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

describe("(Component) Image", function() {
  let comp;
  const initialSrc = "/react/2.svg";

  beforeEach(function() {
    comp = mount(<Image src={initialSrc} />);
    comp.setState({ loaded: true });
  });

  test("renders correctly", () => {
    const tree = renderer.create(<Image src="/react/2.svg" />);
    expect(tree).toMatchSnapshot();
  });

  test("should render the image when loaded", () => {
    expect(comp.find("img").exists()).toBe(true);
  });

  test("should render tutti cube on error", () => {
    // Simulate on error as the image-mock we have blocks
    // dom onError to be triggered.
    comp.instance().onError();
    comp.update();

    expect(comp.find("img").exists()).toBe(false);
    expect(comp.find("span.error").exists()).toBe(true);

    // It should revert on load
    comp.instance().onLoad();
    comp.update();

    expect(comp.find("img").exists()).toBe(true);
    expect(comp.find("span.error").exists()).toBe(false);
  });

  test("should always trigger callbacks", () => {
    const img = mount(<Image />);
    const inst = img.instance();
    expect(inst.state.loaded).toBe(true);
  });

  test("should trigger callbacks when the prop src is updated", () => {
    const instance = comp.instance();
    expect(instance.image.src).toBe(initialSrc);
    instance.componentWillUpdate({ src: "my-src.jpg" });
    expect(instance.image.src).toBe("my-src.jpg");

    // The result shoult be the same because we did not change the
    // props.src (it is still the initialOne)
    instance.componentWillUpdate({ src: initialSrc });
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
});
