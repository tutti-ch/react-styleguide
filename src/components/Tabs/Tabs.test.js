/* global describe, expect, test, jest */
import React from "react";
import { mount } from "enzyme";
import Tabs from "./index";

describe("(Component) Tabs", () => {
  const tree = mount(
    <Tabs>
      <Tabs.Tab title="This is a tab">
        <h1>An amazing tab</h1>
        <div>lots of stuff</div>
      </Tabs.Tab>

      <Tabs.Tab title="This is another tab">
        <h1>Another amazing tab</h1>
        <img src="http://www.cryptolulz.com/content/uploads/images/December2017/me-meme.jpg" />
      </Tabs.Tab>

      <Tabs.Tab title="And they keep coming">
        <h1>Can do magic here</h1>
        <div>lots of stuff</div>
        <img src="https://i.redd.it/c47izks1x8gz.jpg" />
      </Tabs.Tab>

      <Tabs.Tab title="Secret ICO">
        <h1>DOGE</h1>
        <div>lots of stuff</div>
        <div>much WOW</div>
      </Tabs.Tab>
    </Tabs>
  );

  test("should render correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  test("should change tab when clicked", () => {
    expect(tree.state("activeTab")).toBe(0);
    tree
      .find("Tab")
      .at(2)
      .simulate("click");
    expect(tree.state("activeTab")).toBe(2);
  });
});
