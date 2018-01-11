import React from "react";
import Logo from "./_Logo";
import { mount } from "enzyme";

describe("(Components) Logo", () => {
    test("should match the snapshot", () => {
        const comp = mount(<Logo />);
        expect(comp).toMatchSnapshot();
    })
})