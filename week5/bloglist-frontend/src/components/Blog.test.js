import React from 'react'
import 'jest-dom/extend-expect'
import {
  render,
  fireEvent,
  cleanup
} from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Test blog',
    author: 'klaevv',
    url: 'www.asd.com',
    likes: 2
  }
  const user = {
    username: 'klaevv'
  }
  const like = jest.fn()
  const remove = jest.fn()
  const component = render(
    <Blog
      blog={blog}
      user={user}
      likeBlog={like}
      removeBlog={remove}
    />
  )
  expect(component.container).toHaveTextContent('Test blog, klaevv')
})

it('calls the handler twice when cliked twice', async () => {
  const blog = {
    title: 'Test blog',
    author: 'klaevv',
    url: 'www.asd.com',
    likes: 2
  }
  const user = {
    username: 'klaevv'
  }
  const like = jest.fn()
  const remove = jest.fn()
  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      likeBlog={like}
      removeBlog={remove}
    />
  )
  const div = container.querySelector('.openInfo')
  fireEvent.click(div)
  expect(container).toHaveTextContent(
    'Test blog, klaevvwww.asd.comlikes: 2likeadded by: klaevvremove'
  )
})
