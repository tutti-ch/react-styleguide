/* global describe, test */
import React from "react";
import { shallow, mount } from "enzyme";
import Pagination from "./index";
import toJson from "enzyme-to-json";

describe("(Component) Pagination", () => {
  test("should match the snapshot", () => {
    const comp = mount(
      <Pagination page={302} totalItems={3020} pageText="Page" />
    );
    expect(toJson(comp)).toMatchSnapshot();
  });

  test("should not show any page if there are no items", () => {
    const comp = mount(<Pagination page={1} totalItems={0} pageText="Page" />);
    expect(comp.find("Page").length).toBe(0);
  });

  test("should show less pages than the bucket size", () => {
    const comp = mount(
      <Pagination page={1} totalItems={15} pageBucket={5} pageText="Page" />
    );

    // Start, Left, 1, 2, Right, End = 6
    expect(comp.find("Page").length).toBe(6);
  });

  test("should show as many pages as a bucket can contain", () => {
    const comp = mount(
      <Pagination page={1} totalItems={15000} pageBucket={5} pageText="Page" />
    );

    // Start, Left, 1, 2, 3, 4, 5, Right, End = 9
    expect(comp.find("Page").length).toBe(9);
  });

  test("should show the right bucket", () => {
    const comp = mount(
      <Pagination page={6} totalItems={15000} pageBucket={5} pageText="Page" />
    );

    // Start, Left, 1, 2, 3, 4, 5, Right, End = 9
    expect(comp.find("Page").map(p => p.prop("number"))).toEqual([
      1,
      5,
      5,
      6,
      7,
      8,
      9,
      10,
      7,
      1500
    ]);
  });
});
