/* global describe, test, jest, expect */
import React from "react";
import Form from "./index";
import { mount } from "enzyme";

describe("(Component) Form.GenericError", () => {
  test("should match the snapshots", done => {
    const handleSubmit = jest
      .fn()
      .mockReturnValue(Promise.reject({ _error: "Hey" }));
    const comp = mount(
      <Form handleSubmit={handleSubmit}>
        <Form.GenericError />
      </Form>
    );
    expect(comp).toMatchSnapshot();

    comp
      .instance()
      .handleSubmit({ preventDefault: jest.fn() })
      .then(() => {
        comp.update();
        expect(comp).toMatchSnapshot();
        done();
      });
  });
});
