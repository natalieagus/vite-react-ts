## Init `vite-react-ts`

Project setup with:

```
npm init vite@latest vite-react-ts-project -- --template react-ts
cd vite-react-ts-project
npm install
```

## Add linting

```
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

## Design system support (storybook)

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

import _ as jest from 'jest-mock'
window.jest = jest
import _ as jest from 'jest-mock'
window.jest = jest

export const parameters = {
actions: { argTypesRegex: '^on[A-Z].\*' },
controls: {
matchers: {
color: /(background|color)$/i,
      date: /Date$/,
},
},
}

```

## Unit Test

Now install `jest` for testing, and update `.eslint.json, jest.config.cjs`.

```
npm install jest --save-dev
npm install eslint-plugin-jest --save-dev
npm install ts-jest @types/jest --save-dev
npm install @testing-library/react @testing-library/jest-dom --save-dev
npm install jest-environment-jsdom --save-dev
```

We need to configure Jest to mock static files to avoid import error:

```
npm install identity-obj-proxy --save-dev
mkdir __mocks__
touch __mocks__/fileMock.ts
```

Fill it up with some stub data:

```
const Data: string = 'test-file-stub'

export default Data
```

Create your own test files with the name `MODULE.test.tsx`, and run `npm test` after you're done.

## End to end testing

Cypress for QA:

```
npm install cypress --save-dev
npm install eslint-plugin-cypress @testing-library/cypress --save-dev
touch cypress/.eslintrc.json
```

1. Add `.eslintrc.json` and `.tsconfig.json` inside `cypress/`
2. Update `.eslintrc.json` to ignore Cypress folder
3. Update `jest.config.js` file to only match test files in the `src` folder
4. Set up Testing Library by adding this line to the project's `cypress/support/commands.ts`: `import '@testing-library/cypress/add-commands'`

## CI

Create github action script at `.github/workflows/main.yml`, and an `.nvmrc` file with content `16.13`.

```
name: "Main"
on: pull_request
jobs:
  lint-and-test:
    name: Run linters and then tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version-file: ".nvmrc"
          cache: "npm"
      - name: Install dependencies
        run: npm install
      - name: Run ESLint
        run: npm run lint:scripts
      - name: Run Stylelint
        run: npm run lint:styles
      - name: Run Tests
        run: npm test
        env:
          CI: true
      - name: Run Cypress
        uses: cypress-io/github-action@v2
        with:
          build: npm run build
          start: npm run preview -- --port=3000
          wait-on: http://localhost:3000
          browser: chrome
          headless: true
```

Then create a remote repo, and test by making a pull request for `main`.

## Commitlint

To enforce valid commit messages:

```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

Create a `.commitlintrc.json`:

```
{
  "extends": ["@commitlint/config-conventional"]
}
```

Use `husky` to run it before each commit:

```
npm install husky --save-dev
npx husky install
npm pkg set scripts.scriptname="husky install"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```
