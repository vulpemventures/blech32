const Module = require('../src/blech32');
const { malloc, charStar, stringStar, freeMalloc } = require('./utils');

module.exports = { encode, decode };

function encode(hrp, pubkey, witProg) {
  if (hrp !== 'el' && hrp !== 'lq') {
    throw new Error('Invalid confidential prefix');
  }
  if (pubkey.length !== 33 && !Buffer.isBuffer(pubkey)) {
    throw new Error('Invalid blinding key');
  }
  if (!Buffer.isBuffer(witProg)) {
    throw new Error('Invalid witness program');
  } else {
    const prefix = witProg.slice(0, 2).toString('hex');
    if (!prefix.startsWith('0014') && !prefix.startsWith('0020')) {
      throw new Error('Invalid witness program');
    }
  }

  const res = malloc(1001);
  const res_len = malloc(4);
  const witVer = parseInt(witProg[0]);
  const program = Buffer.concat([pubkey, witProg.slice(2)]);

  const ret = Module.ccall(
    'addr_encode', 'number',
    [ 'number', 'number', 'number', 'number', 'number', 'number' ],
    [ res, res_len, stringStar(hrp), witVer, charStar(program), program.length ]
  );
  if(ret === 1) {
    const address = new Uint8Array(
      Module.HEAPU8.subarray(res, res + Module.getValue(res_len, 'i32'))
    );
    freeMalloc();
    return Buffer.from(address).toString();
  } else {
    freeMalloc();
    throw new Error('encode', ret);
  }
}

function decode(address, prefix) {
  const version = malloc(4);
  const program = malloc(1000);
  const programLen = malloc(8);
  const ret = Module.ccall(
    'addr_decode', 'number',
    [ 'number', 'number', 'number', 'number', 'number' ],
    [ version, program, programLen, stringStar(prefix), stringStar(address) ]
  );
  if (ret === 1) {
    const witVer = Module.getValue(version, 'i32');
    const pubkey = Buffer.from(
      new Uint8Array(Module.HEAPU8.subarray(program, program + 33))
    );
    const witProg = Buffer.from(
      new Uint8Array(
        Module.HEAPU8.subarray(
          program + 33,
          program + Module.getValue(programLen, 'i64')
        )
      )
    );
    const res = { 
      pubkey,
      program: Buffer.concat([
        Buffer.from([witVer, witProg.length], 'hex'), 
        witProg,
      ]),
    };
    freeMalloc();
    return res;
  } else {
    freeMalloc();
    throw new Error('decode', ret);
  }
}