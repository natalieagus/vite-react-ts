import '../src/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import * as jest from 'jest-mock'
window.jest = jest

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// add chakra provider in storybook
export const decorators = [
  (Story) => (
    <ChakraProvider>
      <Story />
    </ChakraProvider>
  ),
]
