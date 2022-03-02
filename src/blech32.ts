import Long from "long";
import { validateWitnessVersion } from "./utils";

const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
export const MAX_LEN = 1000;

function hexToLong(hex: string): Long.Long {
  return Long.fromString(hex, true, 16);
}

const GENERATORS = [
  "7d52fba40bd886",
  "5e8dbf1a03950c",
  "1c3a3c74072a18",
  "385d72fa0e5139",
  "7093e5a608865b"
].map(hexToLong);

export type EncodingType = "blech32" | "blech32m";
export const BLECH32: EncodingType = "blech32";
export const BLECH32M: EncodingType = "blech32m";

export function getEncodingType(witnessVersion: number): EncodingType {
  validateWitnessVersion(witnessVersion);
  if (witnessVersion === 0) {
    return BLECH32;
  } else if (witnessVersion === 1) {
    return BLECH32M;
  } else {
    throw new Error(
      `Unsuported witness version (${witnessVersion}), only 0 (blech32) or 1 (blech32m) are supported`
    );
  }
}

function getEncodingConst(enc: EncodingType): Long.Long {
  if (enc === BLECH32) {
    return Long.fromNumber(1);
  } else if (enc === BLECH32M) {
    return hexToLong("2bc830a3");
  } else {
    throw new Error("Invalid encoding type");
  }
}

function polymod(values: number[]): Long.Long {
  let chk = Long.fromNumber(1);
  for (let p = 0; p < values.length; ++p) {
    const top = chk.shiftRight(55);
    chk = chk
      .and(hexToLong("7fffffffffffff"))
      .shiftLeft(5)
      .xor(values[p]);
    for (let i = 0; i < 5; i++) {
      if (
        top
          .shiftRight(Long.fromNumber(i))
          .and(1)
          .equals(1)
      ) {
        chk = chk.xor(GENERATORS[i]);
      }
    }
  }
  return chk;
}

function hrpExpand(hrp: string): Uint8Array {
  const ret: number[] = [];

  for (let p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) >> 5);
  }

  ret.push(0);

  for (let p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) & 31);
  }
  return Uint8Array.from(ret);
}

function verifyChecksum(
  hrp: string,
  data: number[],
  enc: EncodingType
): boolean {
  const hrpAndData = Array.from(hrpExpand(hrp)).concat(data);
  return polymod(hrpAndData).equals(getEncodingConst(enc));
}

const zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function createChecksum(
  hrp: string,
  data: Uint8Array,
  enc: EncodingType
): number[] {
  const values = Array.from(hrpExpand(hrp))
    .concat(Array.from(data))
    .concat(zeros); // concat 12 zero

  const mod = polymod(values).xor(getEncodingConst(enc));

  const ret: Long.Long[] = [];
  for (let p = 0; p < 12; ++p) {
    ret.push(mod.shiftRight(5 * (11 - p)).and(31));
  }
  return ret.map(long => long.toInt());
}

// blech32 encode function
export function encode(
  hrp: string,
  data: Uint8Array,
  enc: EncodingType
): string {
  const checkSum = createChecksum(hrp, data, enc);

  const combined = Array.from(data).concat(checkSum);
  let ret = hrp + "1";
  for (let p = 0; p < combined.length; ++p) {
    ret += CHARSET.charAt(combined[p]);
  }
  return ret;
}

// blech32 decode function
export function decode(
  blechString: string,
  enc: EncodingType
): { hrp: string; data: Uint8Array } {
  let has_lower = false;
  let has_upper = false;
  for (let p = 0; p < blechString.length; ++p) {
    if (blechString.charCodeAt(p) < 33 || blechString.charCodeAt(p) > 126) {
      throw new Error("Invalid charcode in blech32 string");
    }
    if (blechString.charCodeAt(p) >= 97 && blechString.charCodeAt(p) <= 122) {
      has_lower = true;
    }
    if (blechString.charCodeAt(p) >= 65 && blechString.charCodeAt(p) <= 90) {
      has_upper = true;
    }
  }
  if (has_lower && has_upper) {
    throw new Error("blech32 has lowercases AND uppercases");
  }

  blechString = blechString.toLowerCase();
  const pos = blechString.lastIndexOf("1");
  if (pos < 1 || pos + 13 > blechString.length) {
    throw new Error('Invalid index of "1"');
  }
  const hrp = blechString.substring(0, pos);
  const data: number[] = [];
  for (let p = pos + 1; p < blechString.length; ++p) {
    const d = CHARSET.indexOf(blechString.charAt(p));
    if (d === -1) {
      throw new Error(
        `"${blechString.charAt(p)}" is not allowed in blech32 strings`
      );
    }
    data.push(d);
  }

  if (!verifyChecksum(hrp, data, enc)) {
    throw new Error(`invalid ${enc} checksum`);
  }

  return { hrp: hrp, data: Uint8Array.from(data.slice(0, data.length - 12)) };
}
