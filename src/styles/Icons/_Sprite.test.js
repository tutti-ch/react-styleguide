/* global describe, test, jest, expect, beforeEach, afterEach */
import React from "react";
import Sprite from "./_Sprite";
import { mount, shallow } from "enzyme";

describe("(Components) _Sprite", () => {
  const xml = XMLHttpRequest;
  const mockXML = function() {
    this.open = () => {};
    this.send = () => {};
  };

  beforeEach(() => {
    global.XMLHttpRequest = mockXML;
    Sprite.loaded = false;
    Sprite.loading = [];
  });

  afterEach(() => {
    global.XMLHttpRequest = xml;
  });

  test("should return null when the Sprite is not loaded", () => {
    const comp = mount(<Sprite viewBox={"0 0 25 25"} id={"some-id"} />);
    expect(comp.html()).toBe(
      `<svg viewBox="0 0 35 35" class="svg-placeholder"><path fill="#fff" d="M26.8 14.7h-6.6V8.1h-5.6v6.6H8v5.6h6.6v6.6h5.6v-6.6h6.6z"></path><path d="M17.5 0C7.8 0 0 7.8 0 17.5S7.8 35 17.5 35 35 27.2 35 17.5 27.2 0 17.5 0z" fill="#e5e5e5"></path></svg>`
    );
  });

  test("should return the svg when the Sprite is loaded", () => {
    Sprite.loaded = true;
    const comp = mount(<Sprite viewBox={"0 0 25 25"} id={"some-id"} />);
    expect(comp.html()).toBe(
      '<svg role="img" viewBox="0 0 25 25" class="svg-sprite"><use xlink:href="#some-id"></use></svg>'
    );
  });

  test("should make a request when the component is mounting", () => {
    Sprite.loaded = true;
    const comp = shallow(<Sprite viewBox={"0 0 25 25"} id={"some-id"} />);
    const inst = comp.instance();
    inst.req = {
      open: jest.fn(),
      send: jest.fn()
    };

    inst.componentDidMount();
    expect(inst.req.open).not.toHaveBeenCalled();
    Sprite.loaded = false;
    Sprite.loading = [];
    inst.componentDidMount();
    expect(inst.req.open).toHaveBeenCalledWith("GET", "mockimage", true);
    expect(inst.req.send).toHaveBeenCalled();
    expect(typeof inst.req.onload).toBe("function");

    comp.setState({ ready: false });
    inst.req.onload();
    expect(inst.state.ready).toBe(true);
  });
});
