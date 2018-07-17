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
    expect(comp).toMatchSnapshot();
  });

  test("should return the svg when the Sprite is loaded", () => {
    Sprite.loaded = true;
    const comp = mount(<Sprite viewBox={"0 0 25 25"} id={"some-id"} />);
    expect(comp).toMatchSnapshot();
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
