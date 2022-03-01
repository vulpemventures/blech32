export function convertBits(
  bytes: number[],
  from: number,
  to: number,
  pad: boolean
): number[] {
  if (from < 1 || from > 8 || to < 1 || from > 8) {
    throw new Error("only bits groups between 1 and 8 are allowed");
  }

  const regrouped: number[] = [];

  let nextByte = 0;
  let filledBits = 0;

  for (const n of bytes) {
    let b = n << (8 - from);
    // How many bits remaining to extract from the input data.
    let remFromBits = from;
    while (remFromBits > 0) {
      // How many bits remaining to be added to the next byte.
      const remToBits = to - filledBits;

      // The number of bytes to next extract is the minimum of
      // remFromBits and remToBits.
      let toExtract = remFromBits;
      if (remToBits < toExtract) {
        toExtract = remToBits;
      }

      // Add the next bits to nextByte, shifting the already
      // added bits to the left.
      nextByte = (nextByte << toExtract) | (b >> (8 - toExtract));

      // Discard the bits we just extracted and get ready for
      // next iteration.
      b = (b << toExtract) % 256;
      remFromBits -= toExtract;
      filledBits += toExtract;

      // If the nextByte is completely filled, we add it to
      // our regrouped bytes and start on the next byte.
      if (filledBits === to) {
        regrouped.push(nextByte);
        filledBits = 0;
        nextByte = 0;
      }
    }
  }

  // We pad any unfinished group if specified.
  if (pad && filledBits > 0) {
    nextByte = nextByte << (to - filledBits);
    regrouped.push(nextByte);
    filledBits = 0;
    nextByte = 0;
  }

  // Any incomplete group must be <= 4 bits, and all zeroes.
  if (filledBits > 0 && (filledBits > 4 || nextByte !== 0)) {
    throw new Error("invalid incomplete group of bits");
  }

  return regrouped;
}

export function validateWitnessVersion(version: number): void {
  if (version < 0 || version > 16) {
    throw new Error("invalid witness version");
  }
}
