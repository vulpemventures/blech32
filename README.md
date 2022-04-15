# Blech32.js

A Elements extended [BIP173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki) compatible Blech32 encoding/decoding library.

This package provides two types of encoding:
 * BLECH32 for witness version 0.
 * BLECH32M for witness version 1-16. _Note that the blech32m encoding const on Liquid differs from the bitcoin one_ 

## Example

Check out [tests](./test/blech32Address.test.ts) that also demonstrate how to serialize a pubkey and a witness program for generating a confidential address.

## Installation

Install dependencies:

```sh
yarn install
```

Build:

```sh
yarn build
```

## Test

```sh
$ yarn test
```

## Credits

- [ElementsProject](https://github.com/ElementsProject/libwally-core/blob/master/src/blech32.c) for the reference C implementation of blech32.
