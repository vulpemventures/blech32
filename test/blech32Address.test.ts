import { Blech32Address } from "../src";
import { validFixtures } from "./fixtures/blech32Address.fixture";
import { strictEqual } from "assert";

describe("Blech32 Address", () => {
  it("should compute blech32 addresses", () => {
    for (const f of validFixtures) {
      const addr = Blech32Address.from(f.witness, f.blindingPublicKey, f.prefix)
        .address;

      strictEqual(addr, f.address);
      strictEqual(addr, Blech32Address.fromString(f.address).address);
    }
  });
});
