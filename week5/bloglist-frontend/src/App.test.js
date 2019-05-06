import React from 'react'
import {
  render,
  waitForElement
} from 'react-testing-library'
jest.mock('./services/blogService')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(() => component.getByText('login'))
    expect(component.container.querySelector('.blog')).toBeNull()
  })
})
