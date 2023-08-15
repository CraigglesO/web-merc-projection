# web-merc-projection [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![bundle][bundle-image]][bundle-url] [![tree-shake][tree-shake-image]][tree-shake-url]

[npm-image]: https://img.shields.io/npm/v/web-merc-projection.svg
[npm-url]: https://npmjs.org/package/web-merc-projection
[downloads-image]: https://img.shields.io/npm/dm/web-merc-projection.svg
[downloads-url]: https://www.npmjs.com/package/web-merc-projection
[bundle-image]: https://badgen.net/bundlephobia/minzip/web-merc-projection.svg
[bundle-url]: https://bundlephobia.com/package/web-merc-projection
[tree-shake-image]: https://badgen.net/bundlephobia/tree-shaking/web-merc-projection
[tree-shake-url]: https://bundlephobia.com/package/web-merc-projection

## About

`Web Mercator Projection` provides projection maths for converting between mercator meters, screen pixels (of 512x512 or configurable-size tiles), and latitude/longitude.

## Install

```bash
# npm
npm install --save web-merc-projection
# yarn
yarn add web-merc-projection
# pnpm
pnpm add web-merc-projection
```

### Example use

```ts
import {
      llToPX,
      pxToLL,
      llToMerc,
      mercToLL,
      convert,
      xyzToBBOX,
      bboxToXYZBounds
} from 'web-merc-projection'

llToPX([-179, 85], 9, false, 256) // [364, 215]
```

### Recommended configuration

This project uses PNPM to manage dependencies. It is recommended to [install PNPM](https://pnpm.io/installation) globally and use it to install dependencies.

```bash
# install directions from https://pnpm.io/installation

# Windows
iwr https://get.pnpm.io/install.ps1 -useb | iex
# Posix - curl
curl -fsSL https://get.pnpm.io/install.sh | sh -
# Posix - wget
wget -qO- https://get.pnpm.io/install.sh | sh -

# or just install with npm
npm install -g pnpm
```

You may experience issues trying to get linting working in VS Code. The easiest way is to install globally the following packages:

```bash
pnpm install -g standard ts-standard
```

---

## Version Control

This project utilizes the [Semantic Versioning 2.0.0](https://semver.org/)

Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes
2. MINOR version when you add functionality in a backward compatible manner
3. PATCH version when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.
