const Block = require("../block");
const cryptoHash = require("../cryptoHash");
const { GENESIS_DATA, MINE_RATE } = require("../config");
const hexToBinary = require("hex-to-binary");

describe("Block", () => {
  //=================================================>
  // test the block class with necessary parameters
  //=================================================>
  const timestamp = 2000;
  const lastHash = "Test Last Hash";
  const hash = "Test hash";
  const data = "Test Data";
  const nonce = 1;
  const difficulty = 1;

  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty
  });

  it("has a `timestamp` property", () => {
    expect(block.timestamp).toEqual(timestamp);
  });
  it("has a `lastHash`", () => {
    expect(block.lastHash).toEqual(lastHash);
  });
  it("has a `hash` property", () => {
    expect(block.hash).toEqual(hash);
  });
  it("has a `data` property", () => {
    expect(block.data).toEqual(data);
  });
  it("has a `nonce` property", () => {
    expect(block.nonce).toEqual(nonce);
  });
  it("has a `difficulty` property", () => {
    expect(block.difficulty).toEqual(difficulty);
  });

  //=================================================>
  // test the Genesis block
  //=================================================>

  describe("genesis()", () => {
    // Init Genesis block from the Block class
    const genesisBlock = Block.genesis();

    it("returns a Block instance", () => {
      // Check if the genesis block is in the Block class itself
      expect(genesisBlock instanceof Block).toBe(true);
    });

    // Check if the genesis block has the data equal to the data in config file
    it("returns the data from genesis block", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  //=================================================>
  // Mine blocks
  //=================================================>

  describe("minedBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "Mined Block";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("returns a Block instance", () => {
      // Check if the genesis block is in the Block class itself
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("lastBlock.hash = minedBlock.lastHash", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the data", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("sets a timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    // Creates a sha hash
    it("creates a SHA-256 `hash` based on proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.nonce,
          minedBlock.difficulty,
          lastBlock.hash,
          data
        )
      );
    });

    it("sets a hash that matches the difficulty criteria", () => {
      // number of zeros in begenning of the hash have to be equal of difficulty
      // e.g: difficulty = 6, in that case there should 6 zeros before the hex start in hash
      // like 000000x78659789868i709 (6 zeros)
      expect(
        hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)
      ).toEqual("0".repeat(minedBlock.difficulty));
    });

    it("adjusts the difficulty", () => {
      const possibleResults = [
        lastBlock.difficulty + 1,
        lastBlock.difficulty - 1
      ];

      expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
    });
  });

  //=================================================>
  // Dynamic difficulty : Adjust the difficutly automically
  //=================================================>

  describe("adjustDifficulty()", () => {
    it("raises difficulty for a quickly mined block", () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: block,
          // Low the global mine rate to check if it raises or not
          timestamp: block.timestamp + MINE_RATE - 100
        })
      ).toEqual(block.difficulty + 1);
    });

    it("lowers the difficulty for a slowly mined block", () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: block,
          // increase the global mine rate to check if it raises or not
          timestamp: block.timestamp + MINE_RATE + 100
        })
      ).toEqual(block.difficulty - 1);
    });

    it("has a lower limit of 1", () => {
      block.difficulty = -1;

      expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1);
    });
  });
});
