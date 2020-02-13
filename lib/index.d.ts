/**
 * Takes a human readable part ("hrp"), a list of character positions in the
 * bech32 alphabet ("words") and (optionally) a witness version and returns a bech32 encoded string.
 */
export function encode(hrp: string, words: Buffer, witVer?: number): string;

/**
 * Takes a human readable part ("hrp") and a blech32 encoded string and returns
 * a witness version and a list of character positions in the blech32 alphabet ("words").
 *
 * @throws Throws on error
 */
export function decode(hrp: string, address: string): { version: number, words: Buffer };
