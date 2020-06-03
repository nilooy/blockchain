const { cryptoHash } = require("../util/");

describe("cryptoHash()", () => {
  it("generates a SHA-256 hashed output", () => {
    expect(cryptoHash("bitstones")).toEqual(
      "cf7f33991c9affc88a1064ccbc7461a7ffe44e7e3fcc20ee1663d0ad7d0752ed"
    );
  });

  it("produces the same hash with the same arguments in any order", () => {
    expect(cryptoHash("one", "two", "three")).toEqual(
      cryptoHash("three", "one", "two")
    );
  });

  it("produces a unique hash when the properties have changed on an input", () => {
    const foo = {};
    const originalHash = cryptoHash("foo");
    foo["a"] = "a";

    expect(cryptoHash(foo)).not.toEqual(originalHash);
  });
});
