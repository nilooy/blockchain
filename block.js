const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./cryptoHash");

class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
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
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    // destructure lastHash and difficulty from laste block
    let { difficulty } = lastBlock;
    let nonce = 0;

    //=================================================>
    // Sets the difficulty level
    //=================================================>
    do {
      nonce++;
      timestamp = Date.now();
      // re adjust the difficulty for each
      difficulty = Block.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp
      });
      // Generates hash with data
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    // Create new block with the params
    return new this({
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty
    });
  }

  //=================================================>
  // Adjust difficulty auto
  //=================================================>

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) return 1;

    const differnce = timestamp - originalBlock.timestamp;

    if (differnce > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}

module.exports = Block;
