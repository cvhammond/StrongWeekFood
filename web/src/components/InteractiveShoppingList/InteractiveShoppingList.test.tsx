import { render } from '@redwoodjs/testing/web'

import InteractiveShoppingList from './InteractiveShoppingList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InteractiveShoppingList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InteractiveShoppingList />)
    }).not.toThrow()
  })
})
