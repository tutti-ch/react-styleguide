/* global describe, test, expect, jest */
import React from "react";
import Form from "./index";
import Button from "../Button";
import { mount } from "enzyme";

describe("(Component) Form", () => {
  const componentFactory = (handleSubmit, children) => (
    <Form handleSubmit={handleSubmit}>
      <Form.Input name="firstName" value="abc" />
      {/* <Form.Slider values={[5, 6]} min={5} max={10} name={["a", "b"]} /> */}
      {children}
    </Form>
  );

  describe("handleSubmit", () => {
    test("should handle the submit event (success)", done => {
      const handleSubmit = jest.fn().mockReturnValue(Promise.resolve("hey"));
      const comp = mount(componentFactory(handleSubmit));

      const inst = comp.instance();
      const event = { preventDefault: jest.fn() };
      inst.handleSubmit(event).then(() => {
        expect(handleSubmit).toMatchSnapshot();
        expect(event.preventDefault).toHaveBeenCalled();
        done();
      });
    });

    test("should reset the error state on every submit", () => {
      const handleSubmit = jest.fn().mockReturnValue(Promise.resolve());
      const comp = mount(componentFactory(handleSubmit));
      const inst = comp.instance();
      inst.inputs[0].error = true;
      inst.handleSubmit({ preventDefault: jest.fn() });
    });

    test("should handle the submit event (error)", done => {
      const handleSubmit = jest
        .fn()
        .mockReturnValue(Promise.reject({ firstName: "some-error" }));
      const comp = mount(componentFactory(handleSubmit));

      const inst = comp.instance();
      const event = { preventDefault: jest.fn() };
      inst.handleSubmit(event).then(() => {
        expect(handleSubmit).toMatchSnapshot();
        expect(event.preventDefault).toHaveBeenCalled();
        done();
      });
    });
  });

  test("[onSubmit] should register a listener which will be called on submit", done => {
    const handleSubmit = () => {
      return Promise.resolve();
    };

    const button = (
      <Button level={Button.LEVEL_PRIMARY} type="submit">
        Test
      </Button>
    );
    const comp = mount(componentFactory(handleSubmit, button));
    const inst = comp.instance();
    const spy = jest.spyOn(inst.listeners, "0");

    expect(inst.listeners.length).toBe(1);
    inst.handleSubmit({ preventDefault: jest.fn() }).then(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({
        values: expect.anything(),
        loading: true
      });
      expect(spy).toHaveBeenCalledWith({
        values: expect.anything(),
        loading: false
      });
      done();
    });
  });

  test("[onSubmit] should block submitting until a valid response has been received", done => {
    const event = { preventDefault: jest.fn() };
    const handleSubmit = () => {
      expect(inst.submitting).toBe(true);
      expect(inst.handleSubmit(event)).toBe(false);
      return Promise.resolve();
    };

    const comp = mount(componentFactory(handleSubmit));
    const inst = comp.instance();
    inst.handleSubmit(event).then(() => {
      expect(inst.submitting).toBe(false);
      done();
    });
  });

  test("[assignKeyPair] should aggregate values with the same key", () => {
    const values = { a: "b", c: [1, 2] };
    const keyPair = { a: "d", c: 5, d: false, f: null };
    expect(Form.assignKeyPair(values, keyPair)).toEqual({
      a: ["b", "d"],
      c: [1, 2, 5],
      d: false,
      f: null
    });
  });

  test("[componentWillUnmount] should remove the listeners", () => {
    const comp = mount(
      <Form handleSubmit={jest.fn()} className="class-name" />
    );
    const inst = comp.instance();
    inst.listeners = [1, 2, 3, 4];
    inst.componentWillUnmount();
    expect(inst.listeners).toEqual([]);
  });

  test("[handleGenericError] lets a function register itself as a generic error handler", () => {
    const comp = mount(
      <Form handleSubmit={jest.fn()} className="class-name" />
    );
    const inst = comp.instance();
    inst.getChildContext().genericErrorHandler("abc");
    expect(inst.genericErrorHandler).toBe("abc");
  });

  test("handleSubmit should return false when there is no function provided", () => {
    const comp = mount(<Form className="class-name" />);
    const inst = comp.instance();
    expect(inst.handleSubmit()).toBe(false);
  });
});
