import { Blech32Address } from "../src";
import { fixtures } from "./fixtures/blech32Address.fixture";
import { strictEqual } from "assert";

describe("Blech32 Address", () => {
  it("should compute blech32 addresses", () => {
    for (const f of fixtures) {
      const addr = Blech32Address.from(
        f.witness.slice(4),
        f.blindingPublicKey,
        "el"
      ).address;
      strictEqual(addr, f.address);
      strictEqual(addr, Blech32Address.fromString(f.address).address);
    }
  });
});
