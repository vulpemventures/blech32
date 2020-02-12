const Module = require('../src/blech32');

module.exports = {
  malloc,
  charStar,
  stringStar,
  freeMalloc,
}

/**
    @exports
*/
function charStar(buf) {
    const ptr = malloc(buf.length);
    for(let i = 0; i < buf.length; i++) {
        Module.setValue(ptr + i, buf[i], 'i8');
    }
    return ptr
}

/**
    @exports
*/
function stringStar(str) {
    return Module.allocate(
        Module.intArrayFromString(str),
        'i8',
        Module.ALLOC_NORMAL
    )
}

let free = []

/**
    Allocate emscripten memory and schedule to be garbage collected at the first
    possible opportunity.  If this memory pointer needs to be maintained across
    async calls, use Module._malloc and Module._free instead.

    @return emscripten memory pointer
    @exports
*/
function malloc(size) {
    const ptr = Module._malloc(size)
    free.push(ptr)
    return ptr
}

function freeMalloc() {
    for(const ptr of free) {
        Module._free(ptr)
    }
    free = []
}
