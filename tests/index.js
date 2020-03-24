const assert = require('assert');
const { describe, it } = require('mocha');
const blech32 = require('../lib');

describe('blech32', () => {
  const cAddr1 =
    'el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqpe4ppdaa3t44v3zv2u6' +
    'w56pv6tc666fvgzaclqjnkz0sd';
  const cAddr2 =
    'el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqqve2xzutyaf7vjcap67' +
    'f28q90uxec2ve95g3rpu5crapcmfr2l9xl5jzazvcpysz';
  const pubkey = Buffer.from(
    '03a398eed59a2368563bbd2bc68a7ccdbbd6dcbf43b298edc810d22edb6d761800',
    'hex'
  );
  const witProg1 = Buffer.from(
    '0014e6a10b7bd8aeb56444c5734ea682cd2f1ad692c4',
    'hex'
  );
  const witProg2 = Buffer.from(
    '0020332a30b8b2753e64b1d0ebc951c057f0d9c29992d11118794c0fa1c6d2357ca6',
    'hex'
  );
  const program1 = Buffer.concat([pubkey, witProg1.slice(2)]);
  const program2 = Buffer.concat([pubkey, witProg2.slice(2)]);

  it('encodes a witness program to confidential P2WPKH address', () => {
    const cAddr = blech32.encode('el', program1);
    assert.deepEqual(cAddr, cAddr1);
  });

  it('encodes a witness program to confidential P2WSH address', () => {
    const cAddr = blech32.encode('el', program2);
    assert.deepEqual(cAddr, cAddr2);
  });

  it('decodes a confidential P2WPKH address address to witness program', () => {
    const witness = blech32.decode('el', cAddr1);
    assert.deepEqual(witness.version, 0);
    const resPubkey = witness.words.slice(0, 33);
    const resProgram = Buffer.concat([
      Buffer.from([witness.version, witness.words.slice(33).length], 'hex'),
      witness.words.slice(33),
    ]);
    assert.deepEqual(resPubkey, pubkey);
    assert.deepEqual(resProgram, witProg1);
  });

  it('decodes a confidential P2WSH address address to witness program', () => {
    const witness = blech32.decode('el', cAddr2);
    assert.deepEqual(witness.version, 0);
    const resPubkey = witness.words.slice(0, 33);
    const resProgram = Buffer.concat([
      Buffer.from([witness.version, witness.words.slice(33).length], 'hex'),
      witness.words.slice(33),
    ]);
    assert.deepEqual(resPubkey, pubkey);
    assert.deepEqual(resProgram, witProg2);
  });
});
