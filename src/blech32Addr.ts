import { BLECH32, decode, encode, MAX_LEN } from "./blech32";
import { convertBits } from "./utils";

interface Blech32AddressData {
  witness: string;
  blindingPublicKey: string;
  witnessVersion: number;
  hrp: string;
}

/**
 * encodeAddress encodes data
 * @param hrp human readeable part
 * @param witnessProgram witnessProgram = pubkey + witness
 * @param witnessVersion witness version
 */
function encodeAddress({
  witness,
  witnessVersion,
  blindingPublicKey,
  hrp
}: Blech32AddressData): string {
  const witnessProgram = Buffer.concat([
    Buffer.from(blindingPublicKey, "hex"),
    Buffer.from(witness, "hex")
  ]);

  if (witnessVersion > 16)
    throw new Error("witness version cannot be greater than 16");
  const witnessProgLength = witnessProgram.length;

  if (
    witnessVersion === 0 &&
    witnessProgLength !== 53 &&
    witnessProgLength !== 65
  )
    throw new Error(
      "witness version 0 needs witness program length = 53 OR = 65"
    );

  if (witnessProgLength < 2 || witnessProgLength > 65)
    throw new Error("witness program length should be >= 2 and <= 65");

  const data = [
    witnessVersion,
    ...convertBits(Array.from(witnessProgram), 8, 5, true)
  ];
  return encode(hrp, Uint8Array.from(data), BLECH32);
}

/**
 * decodeAddress decodes a segwit string address.
 * @param addr the blech32 encoded string.
 */
function decodeAddress(addr: string): Blech32AddressData {
  const { hrp, data } = decode(addr, BLECH32);

  if (data.length === 0 || data.length > MAX_LEN)
    throw new Error("Invalid data length");

  if (data[0] > 16) throw new Error("Invalid witness version");

  const witnessProgram = convertBits(Array.from(data.slice(1)), 5, 8, false);
  if (witnessProgram.length < 2 || witnessProgram.length > 65)
    throw new Error("Invalid witness data length");

  if (
    data[0] === 0 &&
    witnessProgram.length !== 53 &&
    witnessProgram.length !== 65
  )
    throw new Error("Invalid witness data length for witness version 0");

  const witnessVersion = data[0];
  const blindingPublicKey = Buffer.from(witnessProgram.slice(0, 33)).toString(
    "hex"
  );
  const witness = Buffer.from(witnessProgram.slice(33)).toString("hex");

  return {
    witness,
    blindingPublicKey,
    witnessVersion,
    hrp
  };
}

/**
 * a class wrapping the encodeAddress and decodeAddress functions.
 */
export class Blech32Address {
  address: string;
  witnessVersion: number;
  blindingPublicKey: string;
  witness: string;

  private constructor(data: Blech32AddressData) {
    this.witness = data.witness;
    this.blindingPublicKey = data.blindingPublicKey;
    this.witnessVersion = data.witnessVersion;
    this.address = encodeAddress(data);
  }

  static from(
    witness: string,
    blindingPublicKey: string,
    hrp: string = "lq",
    witnessVersion: number = 0
  ) {
    return new Blech32Address({
      witness,
      witnessVersion,
      blindingPublicKey,
      hrp
    });
  }

  static fromString(blechString: string): Blech32Address {
    return new Blech32Address(decodeAddress(blechString));
  }
}
