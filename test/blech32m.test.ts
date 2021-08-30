import * as assert from "assert";
import { encode, decode, BLECH32M } from "../src/blech32";
import { invalidBlech32m, validBlech32m } from "./fixtures/blech32.fixture";

describe("blech32m encode/decode", () => {
  it("should decode valid strings", () => {
    for (const str of validBlech32m) {
      const blech32m = decode(str, BLECH32M);
      const recode = encode(blech32m.hrp, blech32m.data, BLECH32M);
      assert.strictEqual(recode, str.toLowerCase());
    }
  });

  it("should throw an error for invalid strings", () => {
    for (const str of invalidBlech32m) {
      assert.throws(() => {
        decode(str, BLECH32M);
      });
    }
  });
});
