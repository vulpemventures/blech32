import * as assert from 'assert';
import { encode, decode, BLECH32 } from '../src/blech32';
import { invalidBlech32, validBlech32 } from './fixtures/blech32.fixture';

describe('blech32 encode/decode', () => {

  it('should decode valid strings', () => {
    for (const str of validBlech32) {
      const blech32 = decode(str, BLECH32);
      const recode = encode(blech32.hrp, blech32.data, BLECH32);
      assert.strictEqual(recode, str.toLowerCase());
    }
  });

  it('should throw an error for invalid strings', () => {
    for (const str of invalidBlech32) {
      assert.throws(() => {
        decode(str, BLECH32);
      });
    }
  });
});