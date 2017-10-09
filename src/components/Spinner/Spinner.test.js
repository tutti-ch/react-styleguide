/* global describe, test */
import React from 'react'
import { shallow, mount } from 'enzyme'
import Spinner from './index'
import toJson from 'enzyme-to-json'

describe('(Component) Spinner', () => {
  test('should calculate the styles correctly', () => {
    const comp = shallow(<Spinner color={Spinner.COLOR_LIGHT} />)
    const inst = comp.instance()

    expect(inst.calculateStyles()).toEqual({
      borderBottom: '0.5rem solid rgba(255, 255, 255, 0.6)',
      borderLeft: '0.5rem solid rgba(255, 255, 255, 0.8)',
      borderRight: '0.5rem solid rgba(255, 255, 255, 0.6)',
      borderTop: '0.5rem solid rgba(255, 255, 255, 0.6)',
      height: '5rem',
      width: '5rem'
    })

    comp.setProps({ color: Spinner.COLOR_DARK, size: Spinner.SIZE_SMALL })

    expect(inst.calculateStyles()).toEqual({
      borderBottom: '0.2rem solid rgba(0, 0, 0, 0.1)',
      borderLeft: '0.2rem solid rgba(0, 0, 0, 0.3)',
      borderRight: '0.2rem solid rgba(0, 0, 0, 0.1)',
      borderTop: '0.2rem solid rgba(0, 0, 0, 0.1)',
      height: '2rem',
      width: '2rem'
    })
  })

  test('should match the snapshot', () => {
    const comp = mount(<Spinner size={Spinner.SIZE_LARGE} color={Spinner.COLOR_DARK} className='my-class'/>)
    expect(toJson(comp)).toMatchSnapshot()
  })
})