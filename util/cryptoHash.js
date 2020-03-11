const crypto = require("crypto");

//=================================================>
// GENERATES A SHA 256 HASH WITH INPUT DATA IN ANY ORDER :: ARRAY()
//=================================================>

const cryptoHash = (...inputs) => {
  return crypto
    .createHash("sha256")
    .update(inputs.sort().join("-"))
    .digest("hex");
};

module.exports = cryptoHash;
