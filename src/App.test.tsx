// Imports
import { render, screen } from '@testing-library/react'

// To Test
import App from './App'

// Tests
test('Renders main page correctly', async () => {
  // Setup
  render(<App />)
  const buttons = await screen.findAllByRole('button')

  // Pre Expcations
  expect(buttons[0].innerHTML).toBe('count is 0')

  // Init

  // Post Expctations
  expect(true).toBeTruthy()
})

test('uses jest-dom', () => {
  document.body.innerHTML = `
    <span data-testid="not-empty"><span data-testid="empty"></span></span>
    <div data-testid="visible">Visible Example</div>
  `

  expect(screen.queryByTestId('not-empty')).not.toBeEmptyDOMElement()
  expect(screen.getByText('Visible Example')).toBeVisible()
})
