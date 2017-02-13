<a name="top"></a> json-persist
===============================
> *A JSON file reader/writer for Node v4+*

[![npm Version][image-npm]][url-npm]
[![Travis CI][image-tra]][url-tra]
[![AppVeyor][image-apv]][url-apv]
[![Coverage Status][image-cov]][url-cov]
[![Dependency Status][image-dep]][url-dep]
[![Downloads][image-dls]][url-dls]
[![License (MIT)][image-lic]][url-lic]
[![XO Code Style][image-xos]][url-xo]

## Contents
- [Usage](#usage)
- [Testing](#testing)
- [API](#api)

## Usage
***In Progress...***
*Basic usage*:
```
const jsonPersist = require('json-persist')(module);

```

## Testing
`json-persist` uses [`xo`][url-xo] (with slightly customized configuration) for linting, [`ava`][url-ava] for unit testing, and [`nyc`][url-nyc] for coverage.

### Test Scripts
- `npm run lint`: Uses `xo` to lint the main source file, `index.js`.
- `npm run test-lint`: Uses `xo` to lint the test source files, located in `test/`.
- `npm run unit`: Executes `test-lint` and runs the `ava` unit tests using `nyc` for coverage.
- `npm report`: Generates an HTML coverage report from `nyc`.
- `npm run test`: Executes `lint`, `unit` and `report` in that order.

## API
***In Progress...***

[image-apv]: https://ci.appveyor.com/api/projects/status/09exrne7337ucaw9?svg=true
[image-cov]: https://coveralls.io/repos/github/lodicolo/node-json-persist/badge.svg?branch=master
[image-dep]: https://dependencyci.com/github/lodicolo/node-json-persist/badge
[image-dls]: https://img.shields.io/npm/dm/json-persist.svg?style=flat
[image-lic]: http://img.shields.io/npm/l/json-persist.svg?style=flat
[image-npm]: https://img.shields.io/npm/v/json-persist.svg?style=flat
[image-tra]: https://api.travis-ci.org/lodicolo/node-json-persist.svg?branch=master
[image-xos]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg

[url-apv]: https://ci.appveyor.com/project/lodicolo/node-json-persist
[url-cov]: https://coveralls.io/github/lodicolo/node-json-persist?branch=master
[url-dep]: https://dependencyci.com/github/lodicolo/node-json-persist
[url-dls]: https://npmjs.org/package/json-persist
[url-lic]: https://github.com/lodicolo/json-persist/blob/master/LICENSE
[url-npm]: https://npmjs.org/package/json-persist
[url-tra]: https://travis-ci.org/lodicolo/json-persist

[url-ava]: https://github.com/avajs/ava
[url-nyc]: https://github.com/istanbuljs/nyc
[url-xo]: https://github.com/sindresorhus/xo

[lnk-top]: #contents "Go to Contents"
