export const validFixtures = [
  {
    address:
      "tex1pq2akvug2el2rg6lt6aewh9rzy7dglf9ajdmrkknnwwl3jwxgfkh985x3lrzmrq2mc3c6aa85wgxxfm9v8r062qwq4ty579p54pn2q2hqzacec9ttt8re",
    witness: "d0d1f8c5b1815bc471aef4f4720c64ecac38dfa501c0aac94f1434a866a02ae0",
    blindingPublicKey:
      "02bb66710acfd4346bebd772eb9462279a8fa4bd93763b5a7373bf1938c84dae53",
    prefix: "tex"
  }
];

export const invalidFixtures = [
  "tex1p6jx06jkxz4ladad29vwvssn82xlfu89cwm50dg8zvlzjcmcgpwdsw9ee67", // unconfidential taproot address
  "tex1pq2akvug2el2rg6lt6aewh9rzy7dglf9ajdmrkknnwwl3jwxgfkh985x3lrzmrq2mc3c6aa85wgxxfm9v8r062qwq4ty579p54pn2q2hqzacec9ttt8reaa", // invalid CT address
  "ert1q2z45rh444qmeand48lq0wp3jatxs2nzh492ds9s5yscv2pplxwesajz7q3", // P2WSH (unconfidential)
  "ex1qlg343tpldc4wvjxn3jdq2qs35r8j5yd5vqrmu3", // P2SH (unconfidential)
  ""
];
