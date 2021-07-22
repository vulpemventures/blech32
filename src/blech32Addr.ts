import { BLECH32, decode, encode, MAX_LEN } from "./blech32";
import { convertBits } from './utils';

export interface Blech32AddressData {
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
function encodeAddress({ witness, witnessVersion, blindingPublicKey, hrp }: Blech32AddressData): string {
	const witnessProgram = Buffer.concat([
		Buffer.from(blindingPublicKey, 'hex'),
		Buffer.from(witness, 'hex').slice(2),
	])

	if (witnessVersion > 16) throw new Error('witness version cannot be greater than 16');
	const witnessProgLength = witnessProgram.length;

	if (witnessVersion === 0 && witnessProgLength !== 53 && witnessProgLength !== 65)
		throw new Error('witness version 0 needs witness program length = 53 OR = 65')

	if (witnessProgLength < 2 || witnessProgLength > 65)
		throw new Error('witness program length should be >= 2 and <= 65')

	const data = [witnessVersion, ...convertBits(Array.from(witnessProgram), 8, 5, true)];
	return encode(hrp, Uint8Array.from(data), BLECH32)
}

/**
 * decodeAddress decodes a segwit string address.
 * @param addr the blech32 encoded string.
 */
function decodeAddress(addr: string): Blech32AddressData {
	const { hrp, data } = decode(addr, BLECH32)

	if (data.length === 0 || data.length > MAX_LEN)
		throw new Error('Invalid data length');

	if (data[0] > 16)
		throw new Error('Invalid witness version');

	const witnessProgram = convertBits(Array.from(data.slice(1)), 5, 8, false);
	if (witnessProgram.length < 2 || witnessProgram.length > 65)
		throw new Error('Invalid witness data length');

	if (data[0] === 0 && witnessProgram.length !== 53 && witnessProgram.length !== 65)
		throw new Error('Invalid witness data length for witness version 0')


	const witnessVersion = data[0];
	const blindingPublicKey = Buffer.from(witnessProgram.slice(0, 33)).toString('hex');
	const witness = '0014' + Buffer.from(witnessProgram.slice(33)).toString('hex');

	return {
		witness, blindingPublicKey, witnessVersion, hrp
	}
}

/**
 * a class wrapping the encodeAddress and decodeAddress functions.
 */
export class Blech32Address {
	data: Blech32AddressData;

	constructor(data: Blech32AddressData) {
		this.data = data;
	}

	static fromString(blechString: string): Blech32Address {
		return new Blech32Address(decodeAddress(blechString));
	}

	get address() {
		return encodeAddress(this.data);
	}

	get blindingPublicKey() {
		return this.data.blindingPublicKey;
	}

	get witness() {
		return this.data.witness;
	}

	get witnessVersion() {
		return this.data.witnessVersion;
	}
}