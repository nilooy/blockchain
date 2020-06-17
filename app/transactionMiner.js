class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }

  mineTransactions() {
    // Get transcation pool's valid transaction
    // Generate the miner's reward
    // add a block consisting to these transcations to the blockchain
    // broadcast the updated blockchain
    // clear the pool
  }
}

module.exports = TransactionMiner;
