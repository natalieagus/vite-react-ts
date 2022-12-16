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
