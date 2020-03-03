const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./cryptoHash");

class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  //=================================================>
  // returns a new genesis Block (::this) instance with gensis data
  //=================================================>
  static genesis() {
    return new this(GENESIS_DATA);
  }

  //=================================================>
  // returns a new Block (::this) instance with lastHash (Genesis:=>hash)
  //=================================================>
  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    // Generates hash with data
    const hash = cryptoHash(timestamp, lastHash, data);
    // Create new block with the params
    return new this({
      timestamp,
      lastHash,
      hash,
      data
    });
  }
}

module.exports = Block;
