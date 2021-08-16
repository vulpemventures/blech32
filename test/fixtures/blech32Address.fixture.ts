export const validFixtures = [
  {
    address:
      "el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqpe4ppdaa3t44v3zv2u6w56pv6tc666fvgzaclqjnkz0sd",
    blindingPublicKey:
      "03a398eed59a2368563bbd2bc68a7ccdbbd6dcbf43b298edc810d22edb6d761800",
    witness: "e6a10b7bd8aeb56444c5734ea682cd2f1ad692c4",
    prefix: "el"
  },
  {
    address:
      "el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzrfzakmdwcvqqve2xzutyaf7vjcap67f28q90uxec2ve95g3rpu5crapcmfr2l9xl5jzazvcpysz",
    blindingPublicKey:
      "03a398eed59a2368563bbd2bc68a7ccdbbd6dcbf43b298edc810d22edb6d761800",
    witness: "332a30b8b2753e64b1d0ebc951c057f0d9c29992d11118794c0fa1c6d2357ca6",
    prefix: "el"
  },
  {
    address:
      "lq1qqwrdmhm69vsq3qfym06tlyhfze9ltauay9tv4r34ueplfwtjx0q27dk2c4d3a9ms6wum04efclqph7dg4unwcmwmw4vnqreq3",
    witness: "36cac55b1e9770d3b9b7d729c7c01bf9a8af26ec",
    blindingPublicKey:
      "0386dddf7a2b20088124dbf4bf92e9164bf5f79d2156ca8e35e643f4b97233c0af",
    prefix: "lq"
  },
  {
    address:
      "lq1qq2akvug2el2rg6lt6aewh9rzy7dglf9ajdmrkknnwwl3jwxgfkh985x3lrzmrq2mc3c6aa85wgxxfm9v8r062qwq4ty579p54pn2q2hqnhgwv394ycf8",
    witness: "d0d1f8c5b1815bc471aef4f4720c64ecac38dfa501c0aac94f1434a866a02ae0",
    blindingPublicKey:
      "02bb66710acfd4346bebd772eb9462279a8fa4bd93763b5a7373bf1938c84dae53",
    prefix: "lq"
  }
];

export const invalidFixtures = [
  "el1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef3mwgzkmdw", // invalid CT address
  "ert1q2z45rh444qmeand48lq0wp3jatxs2nzh492ds9s5yscv2pplxwesajz7q3", // P2WSH (unconfidential)
  "ex1qlg343tpldc4wvjxn3jdq2qs35r8j5yd5vqrmu3", // P2SH (unconfidential)
  "",
];
