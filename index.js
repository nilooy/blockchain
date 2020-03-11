const express = require("express");
const request = require("request");
const morgan = require("morgan");
const Blockchain = require("./blockchain");
const PubSub = require("./app/pubsub");

const app = express();
const blockchain = new Blockchain();
const pubSub = new PubSub({ blockchain });
const DEFAULT_PORT = 8000;

const ROOT_NODE_ADDR = "http://localhost:" + DEFAULT_PORT;

setTimeout(() => {
  pubSub.broadcastChain();
}, 1000);

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });

  pubSub.broadcastChain();

  res.redirect("/api/blocks");
});

const syncChain = () => {
  request({ url: ROOT_NODE_ADDR + "/api/blocks" }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const rootChain = JSON.parse(body);
      console.log("replace chain on a sync with ", rootChain);
      blockchain.replaceChain(rootChain);
    }
  });
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log("@=> Server is up and running on " + PORT);

  if (PORT !== DEFAULT_PORT) {
    syncChain();
  }
});
