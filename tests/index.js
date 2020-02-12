const assert = require('assert');
const { describe, it } = require('mocha');
const blech32 = require('../lib');
// const unconfidentialAddress = 'ert1qu6ssk77c466kg3x9wd82dqkd9udddykyfykm9k';
// const confidentialKey = '03a398eed59a2368563bbd2bc68a7ccdbbd6dcbf43b298edc810d22edb6d761800';
// const confidentialAddress = 'el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqpe4ppdaa3t44v3zv2u6w56pv6tc666fvgzaclqjnkz0sd';

describe('blech32', () => {
  it('encodes a witness program to confidential P2WPKH address', () => {
    const expected = 'el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqpe' +
      '4ppdaa3t44v3zv2u6w56pv6tc666fvgzaclqjnkz0sd';
    const pubkey = Buffer.from(
      '03a398eed59a2368563bbd2bc68a7ccdbbd6dcbf43b298edc810d22edb6d761800',
      'hex'
    );
    const witProg = Buffer.from(
      '0014e6a10b7bd8aeb56444c5734ea682cd2f1ad692c4',
      'hex'
    );
    const cAddr = blech32.encode('el', pubkey, witProg);
    assert.equal(cAddr, expected);
  });

  it('encodes a witness program to confidential P2WSH address', () => {
    const expected = 'el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqqv' +
      'e2xzutyaf7vjcap67f28q90uxec2ve95g3rpu5crapcmfr2l9xl5jzazvcpysz';
    const pubkey = Buffer.from(
      '03a398eed59a2368563bbd2bc68a7ccdbbd6dcbf43b298edc810d22edb6d761800',
      'hex'
    );
    const witProg = Buffer.from(
      '0020332a30b8b2753e64b1d0ebc951c057f0d9c29992d11118794c0fa1c6d2357ca6',
      'hex'
    );
    const cAddr = blech32.encode('el', pubkey, witProg);
    assert.equal(cAddr, expected);
  });

  it('decodes a confidential P2WPKH address address to witness program', () => {
    const cAddr = 'el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqpe4pp' +
      'daa3t44v3zv2u6w56pv6tc666fvgzaclqjnkz0sd';
    const witness = blech32.decode(cAddr, 'el');
    const expectedPubkey = 
      '03a398eed59a2368563bbd2bc68a7ccdbbd6dcbf43b298edc810d22edb6d761800';
    const expectedProgram = '0014e6a10b7bd8aeb56444c5734ea682cd2f1ad692c4';
    assert.equal(witness.pubkey.toString('hex'), expectedPubkey);
    assert.equal(witness.program.toString('hex'), expectedProgram);
  });

  it('decodes a confidential P2WSH address address to witness program', () => {
    const cAddr = 'el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqqve2x' +
      'zutyaf7vjcap67f28q90uxec2ve95g3rpu5crapcmfr2l9xl5jzazvcpysz';
    const witness = blech32.decode(cAddr, 'el');
    const expectedPubkey =
      '03a398eed59a2368563bbd2bc68a7ccdbbd6dcbf43b298edc810d22edb6d761800';
    const expectedProgram =
      '0020332a30b8b2753e64b1d0ebc951c057f0d9c29992d11118794c0fa1c6d2357ca6';
    assert.equal(witness.pubkey.toString('hex'), expectedPubkey);
    assert.equal(witness.program.toString('hex'), expectedProgram);
  });
});