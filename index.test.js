const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe("Block", () => {
  const timestamp = "";
  const lastHash = "";
  const hash = "";
  const data = ["blockchain", "data"];
  const block = new Block({ timestamp, lastHash, hash, data });

  it("has a timestamp, lastHash, hash and data property", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});

describe("genesis()", () => {
  const genesisBlock = Block.genesis();

  it("return a Block instance", () => {
    expect(genesisBlock instanceof Block).toEqual(true);
  });

  it("returns the genesis data", () => {
    expect(genesisBlock).toEqual(GENESIS_DATA);
  });
});

describe("mineBlock()", () => {
  const lastBlock = Block.genesis();
  const data = "mined data";
  const mineBlock = Block.mineBlock({ lastBlock, data });

  it("returns a block instance", () => {
    expect(mineBlock instanceof Block).toBe(true);
  });

  it("sets the `lastHash` to be the `hash` of the lastBlock", () => {
    expect(mineBlock.lastHash).toEqual(lastBlock.hash);
  });

  it("sets the `data`", () => {
    expect(mineBlock.data).toEqual(data);
  });

  it("sets a `timestamp`", () => {
    expect(mineBlock.timestamp).not.toEqual(undefined);
  });
});
