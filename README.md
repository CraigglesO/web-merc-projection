# web-merc-projection [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![bundle][bundle-image]][bundle-url] [![tree-shake][tree-shake-image]][tree-shake-url]

[npm-image]: https://img.shields.io/npm/v/web-merc-projection.svg
[npm-url]: https://npmjs.org/package/web-merc-projection
[downloads-image]: https://img.shields.io/npm/dm/web-merc-projection.svg
[downloads-url]: https://www.npmjs.com/package/web-merc-projection
[bundle-image]: https://badgen.net/bundlephobia/minzip/web-merc-projection
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

You may experience issues trying to get linting working in VS Code. The easiest way is to install globally the following packages:

```bash
pnpm install -g standard ts-standard
```

---

## License

Copyright (c) 2023, S2Maps

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.
* Neither the name of S2 Maps nor the names of its contributors
      may be used to endorse or promote products derived from this software
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
