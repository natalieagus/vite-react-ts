// Button.stories.tsx
import { Meta, Story } from '@storybook/react'
import App from './App'

export default {
  component: App,
} as Meta

export const MainApp: Story = (args) => <App {...args} />

// setting some argument
MainApp.args = {
  label: 'App',
  primary: true,
}
