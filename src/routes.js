const { Router } = require("express");
const router = Router();

const { rndStr, rndInt } = require("./utils/rnd");

router.get("/entries/:key", (req, res) => {
  res.send(rndStr(rndInt()));
});

module.exports = router;
