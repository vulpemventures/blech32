# Blech32.js

[![build status](https://api.travis-ci.com/vulpemventures/blech32.png)](http://travis-ci.com/vulpemventures/blech32)

A Elements extended [BIP173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki) compatible Blech32 encoding/decoding library.

## Example

Check out [tests](./tests/index.js) that also demonstrate how to serialize a pubkey and a witness program for generating a confidential address.

## Installation

Install dependencies:

```sh
$ npm install
```

Build (with *Emscripten* installed via `emsdk`):

```sh
$ source path/to/emsdk_env.sh
$ emcc src/blech32.c -o src/blech32.js -O3 -s WASM=0 -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "getValue", "setValue", "allocate", "intArrayFromString", "ALLOC_NORMAL"]' -s EXPORT_ALL=1 -s LINKABLE=1 -s NO_EXIT_RUNTIME=1
```

Build (with Docker)

```sh
$ git submodule update --init
$ docker build -t secp256k1-js .
$ npm run compile
```

## Bundle

```sh
$ browserify lib/index.js --standalone blech32 > bundle.js
```

## Test

```sh
$ npm run test
```

## Credits

* [ElementsProject](https://github.com/ElementsProject/libwally-core/blob/master/src/blech32.c) for the reference C implementation of blech32.
