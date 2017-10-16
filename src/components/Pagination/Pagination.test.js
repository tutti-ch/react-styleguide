/* global describe, test */
import React from "react";
import { shallow, mount } from "enzyme";
import Pagination from "./index";
import toJson from "enzyme-to-json";

describe("(Component) Pagination", () => {
  test("should match the snapshot", () => {
    const comp = mount(
      <Spinner
        size={Spinner.SIZE_LARGE}
        color={Spinner.COLOR_DARK}
        className="my-class"
      />
    );
    expect(toJson(comp)).toMatchSnapshot();
  });
});
