const { cryptoHash } = require("../util/");

describe("cryptoHash()", () => {
  it("generates a SHA-256 hashed output", () => {
    expect(cryptoHash("bitstones")).toEqual(
      "7d519c09df9004cdd65ecea2bfb0f6ad84013897e00f034af30690f045f45ff0"
    );
  });

  it("produces the same hash with the same arguments in any order", () => {
    expect(cryptoHash("one", "two", "three")).toEqual(
      cryptoHash("three", "one", "two")
    );
  });
});
