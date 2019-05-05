import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const callback = jest.mock()
  const blog = {
    title: 'Test blog',
    author: 'klaevv'
  }
  const component = render(
    <SimpleBlog blog={blog} onclick={callback} />
  )
  expect(component.container).toHaveTextContent('Test blog')
})