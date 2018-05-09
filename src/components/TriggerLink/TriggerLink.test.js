import React from "react";
import TriggerLink from "./TriggerLink";
import { mount } from "enzyme";

describe("(component) TriggerLink", () => {
  test("snapshot!", () => {
    const component = mount(
      <TriggerLink onClick={() => {}}>Order pizza</TriggerLink>
    );
    expect(component).toMatchSnapshot();
  });
});
