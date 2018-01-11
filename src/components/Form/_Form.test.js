/* global describe, test, expect, jest */
import React from "react";
import Form from "./index";
import { mount } from "enzyme";

describe("(Component) Form", () => {
  const componentFactory = handleSubmit => (
    <Form handleSubmit={handleSubmit}>
      <Form.Input name="firstName" value="abc" />
      <Form.Slider values={[5, 6]} min={5} max={10} name={["a", "b"]} />
    </Form>
  );

  describe("handleSubmit", () => {
    test("should handle the submit event (success)", done => {
      const handleSubmit = jest.fn().mockReturnValue(Promise.resolve("hey"));
      const comp = mount(componentFactory(handleSubmit));

      const inst = comp.instance();
      const event = { preventDefault: jest.fn() };
      inst.handleSubmit(event).then(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
          firstName: "abc",
          a: 5,
          b: 6
        });
        expect(event.preventDefault).toHaveBeenCalled();
        done();
      });
    });

    test("should reset the error state on every submit", () => {
      const handleSubmit = jest.fn().mockReturnValue(Promise.resolve());
      const comp = mount(componentFactory(handleSubmit));
      const inst = comp.instance();
      inst.inputs[0].error = true;
      inst.inputs[0].self.handleError = jest.fn();
      inst.inputs[1].self.handleError = jest.fn();
      inst.handleSubmit({ preventDefault: jest.fn() });
      expect(inst.inputs[0].self.handleError).toHaveBeenCalledWith(null);
      expect(inst.inputs[1].self.handleError).not.toHaveBeenCalled();
    });

    test("should handle the submit event (error)", done => {
      const handleSubmit = jest
        .fn()
        .mockReturnValue(Promise.reject({ firstName: "some-error" }));
      const comp = mount(componentFactory(handleSubmit));

      const inst = comp.instance();
      const spy1 = jest.spyOn(inst.inputs[0].self, "handleError");
      const spy2 = jest.spyOn(inst.inputs[1].self, "handleError");
      const event = { preventDefault: jest.fn() };
      inst.handleSubmit(event).then(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
          firstName: "abc",
          a: 5,
          b: 6
        });
        expect(spy1).toHaveBeenCalledWith("some-error");
        expect(spy2).not.toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
        done();
      });
    });
  });

  test("[assignKeyPair] should aggregate values with the same key", () => {
    const values = { a: "b", c: [1, 2] };
    const keyPair = { a: "d", c: 5, d: false, f: null };
    expect(Form.assignKeyPair(values, keyPair)).toEqual({
      a: ["b", "d"],
      c: [1, 2, 5],
      d: false
    });
  });
});
