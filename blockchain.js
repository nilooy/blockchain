const Block = require("./block");
const cryptoHash = require("./cryptoHash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  //=================================================>
  // To add new block to the chain
  //=================================================>

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    });

    this.chain.push(newBlock);
  }

  //=================================================>
  // Check if the whole chain is valid or not
  //=================================================>

  static isValidChain(chain) {
    // Check if the genesis block is correct
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;
    // check each block of the chain
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data } = chain[i];
      const actualLastHash = chain[i - 1].hash;

      // Check if the last hash is the same as the actual last hash
      if (lastHash !== actualLastHash) return false;
      const validatedHash = cryptoHash(timestamp, lastHash, data);
      // Validate hash by making a hash with the same data
      if (hash !== validatedHash) return false;
    }

    return true;
  }
}

module.exports = Blockchain;
