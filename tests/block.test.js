const Block = require("../block");
const cryptoHash = require("../cryptoHash");
const { GENESIS_DATA } = require("../config");

describe("Block", () => {
  //=================================================>
  // test the block class with necessary parameters
  //=================================================>
  const timestamp = "Test date";
  const lastHash = "Test Last Hash";
  const hash = "Test hash";
  const data = "Test Data";

  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data
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
        cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
