import React from 'react'
import {
  render,
  waitForElement
} from 'react-testing-library'
jest.mock('./services/blogService')
import App from './App'

describe('<App />', () => {
  it('does not show blogs if user is not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(() => component.getByText('login'))
    expect(component.container.querySelector('.blog')).toBeNull()
  })

  it('shows blogs if user is logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'John Doe'
    }
    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(() => component.getByText('blogs'))
    expect(component.container).toHaveTextContent('John Doe logged in :)')
  })
})
