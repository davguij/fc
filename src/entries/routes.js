const { Router } = require("express");
const router = Router();

const { Entry } = require("./models");
const { rndStr, rndInt } = require("../utils/rnd");

router.get("/entries/:key", async (req, res) => {
  const { key } = req.params;
  const entry = await Entry.findById(key);
  if (entry) {
    console.log("Cache hit!");
    res.send(entry.value);
  } else {
    console.log("Cache miss!");
    const newEntry = new Entry({ _id: key, value: rndStr(rndInt()) });
    await newEntry.save();
    res.send(newEntry.value);
  }
});

module.exports = router;
