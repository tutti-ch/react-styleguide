/* global describe, test, expect */
import React from 'react'
import Button from './Button'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('(Component) Button', () => {
  test('should render snapshot correctly', () => {
    const props = {
      icon: 'tutti-cube',
      iconAfter: 'test-ico',
      disabled: true,
      className: 'my-class'
    }

    const comp = mount(
      <Button level="primary" size="large" {...props}>
        Test content
      </Button>
    )

    expect(toJson(comp)).toMatchSnapshot()

    comp.setProps({ loading: true })
    expect(toJson(comp)).toMatchSnapshot()
  })
})