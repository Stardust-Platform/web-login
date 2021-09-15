# Development Code Guide

## Commands
scaffolds the library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run project in one terminal:

```bash
yarn
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
yarn
yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure project is running in watch mode like recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `yarn build`.

To run tests, use `yarn test`.

## Configuration

Code quality is set up with `prettier`, `husky`, and `lint-staged`.

### Jest

Jest tests are set up to run with `yarn test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `yarn size` and visulize it with `yarn analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/example
  index.html
  index.tsx       # test library here in a demo app
  package.json
  tsconfig.json
/src
  /components     # REACT COMPONENTS
  /screens        # REACT SCREENS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
...
```

#### React Testing Library

Comming soon ...

### Rollup

We use [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`.

## Continuous Integration

### GitHub Actions

Two actions are added:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations).

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Styles

We use StyledComponents for make styles

## Publishing to NPM

Recommend using [np](https://github.com/sindresorhus/np).
