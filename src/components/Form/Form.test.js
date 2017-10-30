/* global describe, expect, test */
import React from "react"
import { mount } from "enzyme"
import Form from "./Form"

describe("(Styleguide) Form", () => {
  test("should match the snapshot", () => {
    const comp = mount(<Form/>)
    expect(comp).toMatchSnapshot()
  })
})