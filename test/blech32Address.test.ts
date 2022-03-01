import { BLECH32, Blech32Address, BLECH32M } from "../src";
import * as blech32fixture from "./fixtures/blech32Address.fixture";
import * as blech32mfixture from "./fixtures/blech32mAddress.fixture";
import { strictEqual, throws } from "assert";

describe("Blech32 Address (witness version: 0)", () => {
  const { validFixtures, invalidFixtures } = blech32fixture;

  it("should compute blech32 addresses from witness program, a blinding public key and a prefix", () => {
    for (const f of validFixtures) {
      const addrObj = Blech32Address.from(
        f.witness,
        f.blindingPublicKey,
        f.prefix,
        0
      );
      strictEqual(addrObj.witnessVersion, 0);

      const addr = addrObj.address;

      strictEqual(addr, f.address);
      strictEqual(addr, Blech32Address.fromString(f.address, BLECH32).address);
    }
  });

  it("should throw an error if we try to decode an invalid blech32 address", () => {
    for (const str of invalidFixtures) {
      throws(() => Blech32Address.fromString(str, BLECH32));
    }
  });
});

describe("Blech32m Address (witness version: 1)", () => {
  const { validFixtures, invalidFixtures } = blech32mfixture;

  it("should compute blech32m addresses from witness program, a blinding public key and a prefix", () => {
    for (const f of validFixtures) {
      // console.log(Blech32Address.fromString(f.address));
      const addrObj = Blech32Address.from(
        f.witness,
        f.blindingPublicKey,
        f.prefix,
        1
      );
      strictEqual(addrObj.witnessVersion, 1);

      const addr = addrObj.address;
      strictEqual(addr, f.address);
      strictEqual(addr, Blech32Address.fromString(f.address, BLECH32M).address);
    }
  });

  it("should throw an error if we try to decode an invalid blech32 address", () => {
    for (const str of invalidFixtures) {
      throws(() => Blech32Address.fromString(str, BLECH32M));
    }
  });
});
