Project setup with:

```
npm init vite@latest vite-react-ts-project -- --template react-ts
cd vite-react-ts-project
npm install
npm install eslint --save-dev
npx eslint --init
```

Chosen type:

- running on both node and browser,
- javascript modules,
- typescript, and react
- `yaml` setting file

Setup the files `.eslintignore` and `.eslintrc.yml`

Then install ESLint plugin to enforce rules of hooks on React code, along with stylelint and prettier:

```
npm install eslint-plugin-react-hooks --save-dev
npm install stylelint stylelint-config-standard stylelint-config-recess-order --save-dev
npm install prettier eslint-config-prettier eslint-plugin-prettier stylelint-config-prettier --save-dev
```

Setup the files `.stylelintignore, .stylelintrc.json, .prettierrc`. Update `package.json` to run the linters. Run linter and fix when possible:

```
npm run lint:styles -- --fix
npm run lint:scripts -- --fix
```

Now setup storybook:

```
npx sb init --builder storybook-builder-vite
```

Setup `storybook/main.cjs`, make sure to config `global` as `window` in vite.

```
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    return {
      ...config,
      define: {
        ...config.define,
        global: 'window',
      },
      esbuild: {
        ...config.esbuild,
      },
    }
  },
}
```

Also import `jest-mock` in `storybook/preview.cjs`:

```
import * as jest from 'jest-mock'
window.jest = jest
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

```
