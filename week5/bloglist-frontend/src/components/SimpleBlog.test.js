import React from 'react'
import 'jest-dom/extend-expect'
import {
  render,
  fireEvent,
  cleanup
} from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import { prettyDOM } from 'dom-testing-library'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Test blog',
    author: 'klaevv',
    likes: 2
  }
  const like = jest.fn()
  const component = render(
    <SimpleBlog blog={blog} onClick={like} />
  )
  expect(component.container).toHaveTextContent('Test blog klaevvblog has 2 likes')
})

it('calls the handler twice when cliked twice', async () => {
  const blog = {
    title: 'Test blog',
    author: 'klaevv',
    likes: 2
  }
  const like = jest.fn()
  const { getByText } = render(
    <SimpleBlog blog={blog} like={like} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(like.mock.calls.length).toBe(2)

})
