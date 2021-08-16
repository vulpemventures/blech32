import { Blech32Address } from "../src";
import {
  invalidFixtures,
  validFixtures
} from "./fixtures/blech32Address.fixture";
import { strictEqual, throws } from "assert";

describe("Blech32 Address", () => {
  it("should compute blech32 addresses from witness program, a blinding public key and a prefix", () => {
    for (const f of validFixtures) {
      const addr = Blech32Address.from(f.witness, f.blindingPublicKey, f.prefix)
        .address;

      strictEqual(addr, f.address);
      strictEqual(addr, Blech32Address.fromString(f.address).address);
    }
  });

  it("should throw an error if we try to decode an invalid blech32 address", () => {
    for (const str of invalidFixtures) {
      throws(() => Blech32Address.fromString(str));
    }
  });
});
