const crypto = require("crypto");
const cryptoHash = require("./cryptoHash");

//=================================================>
// THE FIRTS BLOCK IN THE BLOCKCHAIN
//=================================================>

const GEN_LAST_HASH = "GENESIS BLOCK DOES NOT HAVE A LAST HASH";
const GEN_DATA =
  "IT IS A DIGITAL ASSET GENERATION SYSTEM WITH CRYPTO CURRENCY EXCHANGE PROTOCOL";

//=================================================>
// EXPORTED CONFIG
//=================================================>

const Config = {
  GENESIS_DATA: {
    timestamp: Date.now(),
    lastHash: cryptoHash(GEN_LAST_HASH),
    hash: cryptoHash([this.timestamp, this.lastHash, this.data].join()),
    data: cryptoHash(GEN_DATA)
  }
};

//=================================================>
// cryptoHash, GEN_LAST_HASH, GEN_DATA  is declared above
//=================================================>

module.exports = Config;
