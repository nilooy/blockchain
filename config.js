const { cryptoHash } = require("./util/");

//=================================================>
// THE FIRTS BLOCK IN THE BLOCKCHAIN
//=================================================>

const GEN_LAST_HASH = "GENESIS BLOCK DOES NOT HAVE A LAST HASH";
const GEN_DATA =
  "IT IS A DIGITAL ASSET GENERATION SYSTEM WITH CRYPTO CURRENCY EXCHANGE PROTOCOL";
const GEN_INITIAL_DIFFICLUTY = 3;

const GEN_MINE_RATE = 1000;

//=================================================>
// EXPORTED CONFIG
//=================================================>

const Config = {
  GENESIS_DATA: {
    timestamp: Date.now(),
    lastHash: cryptoHash(GEN_LAST_HASH),
    hash: cryptoHash([this.timestamp, this.lastHash, this.data].join()),
    data: cryptoHash(GEN_DATA),
    nonce: 0,
    difficulty: GEN_INITIAL_DIFFICLUTY,
  },
  MINE_RATE: GEN_MINE_RATE,
  STARTING_BALANCE: 1000,
};

//=================================================>
// cryptoHash, GEN_LAST_HASH, GEN_DATA  is declared above
//
//=================================================>

module.exports = Config;
