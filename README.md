# Blech32.js

This repo contains *C* methods of Blech32 Elements implementation exported to *Javascript*.  
This is still a Work in Progress.

## Installation

Clone repo:

```sh
$ git clone https://gihtub.com/vulpemventures/blech32.git
```

Install dependencies:

```sh
$ npm install
```

Build (with *Emscripten* installed via `emsdk`):

```sh
$ source path/to/emsdk_env.sh
$ emcc src/blech32.c -o lib/blech32.js -s WASM=0 -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "getValue", "setValue", "allocate", "intArrayFromString", "ALLOC_NORMAL"]' -s EXPORT_ALL=1 -s LINKABLE=1 -s NO_EXIT_RUNTIME=1
```

Test:

```sh
$ npm run test
```
