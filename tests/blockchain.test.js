const Blockchain = require("../blockchain");
const Block = require("../blockchain/block");
const cryptoHash = require("../util/cryptoHash");

describe("Blockchain", () => {
  let blockchain, newChain, originalChain;

  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();

    originalChain = blockchain.chain;
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
  // VALIDATE THE CHAIN
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
      // jumped difficulty
      describe("and the chain conatins a block with a jumped diifficulty", () => {
        it("returns false", () => {
          const lastBlock = blockchain.chain[blockchain.chain.length - 1];
          const lastHash = lastBlock.hash;
          const timestamp = Date.now();
          const nonce = 0;
          const data = [];
          const difficulty = lastBlock.difficulty - 3;

          const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

          const fakeBlock = new Block({
            timestamp,
            lastHash,
            hash,
            nonce,
            difficulty,
            data
          });

          blockchain.chain.push(fakeBlock);

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

  //=================================================>
  // REPLACE THE CHAIN
  //=================================================>

  describe("replaceChain()", () => {
    let errorMock, logMock;

    beforeEach(() => {
      errorMock = jest.fn();
      logMock = jest.fn();

      global.console.error = errorMock;
      global.console.log = logMock;
    });

    describe("when the new chain is not longer", () => {
      beforeEach(() => {
        // tempering the chain first block to invalid the chain
        newChain.chain[0] = { new: "fake-chain" };
        blockchain.replaceChain(newChain.chain);
      });

      it("does not replace the chain", () => {
        expect(blockchain.chain).toEqual(originalChain);
      });

      it("logs an error", () => {
        expect(errorMock).toHaveBeenCalled();
      });
    });
    describe("when the new chain is longer", () => {
      beforeEach(() => {
        newChain.addBlock({ data: "Test 1" });
        newChain.addBlock({ data: "Ogni bitstone fa parte di te" });
        newChain.addBlock({ data: "Pokemon" });
      });
      describe("and the chain is invalid", () => {
        beforeEach(() => {
          newChain.chain[2].hash = "some-fake hash";
          blockchain.replaceChain(newChain.chain);
        });

        it("does not replace the chain", () => {
          expect(blockchain.chain).toEqual(originalChain);
        });
        it("logs an error", () => {
          expect(errorMock).toHaveBeenCalled();
        });
      });

      describe("and the chain is valid", () => {
        beforeEach(() => {
          blockchain.replaceChain(newChain.chain);
        });

        it("replaces the chain", () => {
          expect(blockchain.chain).toEqual(newChain.chain);
        });

        it("logs about the chain replacement", () => {
          expect(logMock).toHaveBeenCalled();
        });
      });
    });
  });
});
