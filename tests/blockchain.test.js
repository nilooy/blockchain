const Blockchain = require("../blockchain");
const Block = require("../block");

describe("Blockchain", () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("contains a chain array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with the genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block to the chain", () => {
    const newData = "Test Data";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  //=================================================>
  // the chain is not valid if
  // 1. doesn't start
  //=================================================>

  describe("isValidChain()", () => {
    describe("When the chain does not start with the genesis block", () => {
      it("returns false", () => {
        //tempered genesis block
        blockchain.chain[0] = { data: "Fake genesis block" };
        // check if isValidChain detect the fake genesis block
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("When the chain starts with the genesis block and has multi blocks", () => {
      beforeEach(() => {
        blockchain.addBlock({ data: "Test 1" });
        blockchain.addBlock({ data: "Ogni bitstone fa parte di te" });
        blockchain.addBlock({ data: "Pokemon" });
      });
      describe("and a lastHash reference has changed", () => {
        it("returns false", () => {
          //Tempered the last hash of the block no 2
          blockchain.chain[2].lastHash = "Broken lasthash";
          // check if isValidChain detect the fake genesis block
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain contains a block with invalid fields", () => {
        it("returns false", () => {
          //Tempered the last hash of the block no 2
          blockchain.chain[2].data = "False data";
          // check if isValidChain detect the fake genesis block
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      // the chain is valido
      describe("the chain is valid and does not contain any invalid blocks", () => {
        it("returns true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
});
