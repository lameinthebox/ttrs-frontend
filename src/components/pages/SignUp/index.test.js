import React from 'react'
import { shallow } from 'enzyme'
import SignUp from './index'

const wrap = (props = {}) => shallow(<SignUp {...props} />)

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' })
  expect(wrapper.contains('test')).toBe(true)
})

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})