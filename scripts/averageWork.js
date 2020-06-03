const Blockchain = require("../blockchain");

const blockchain = new Blockchain();

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const times = [];

for (let i = 0; i < 10000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({
    data: "block " + i,
  });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - prevTimestamp;

  times.push(timeDiff);

  average = times.reduce((total, num) => total + num) / times.length;

  console.log({
    timesToMineBlock: timeDiff + "ms",
    difficulty: nextBlock.difficulty,
    AvgTime: average + "ms",
    Hash: nextBlock.hash,
    lastBlock: nextBlock.lastHash,
  });
}

//=================================================>
// Check the transaction pool
// function to test transaction pool
//=================================================>

const transactionPool = (wallet, blocks) => {
  const transaction = wallet.transaction.id;
  const user = wallet.user;

  if (!user || !transaction) throw new Error("Transaction not found");

  const lastBlock = blocks[blocks.length - 1];

  const transactionPool = lastBlock._id === transaction._id;

  if (transactionPool) {
    return wallet;
  } else return null;
};
