const { Router } = require("express");
const router = Router();

const { Entry } = require("./models");
const { rndStr, rndInt } = require("../utils/rnd");

router.get("/entries/:key", async (req, res) => {
  const { key } = req.params;
  const entry = await Entry.findById(key);
  const expiration = Date.now() + 1 * 60; // TODO pass this interval to an envvar
  if (!entry || entry.expires_at < Date.now()) {
    console.log("Cache miss!");
    const newEntry = await Entry.findByIdAndUpdate(
      key,
      {
        value: rndStr(rndInt()),
        expires_at: expiration,
      },
      { new: true, upsert: true }
    );
    res.send(newEntry.value);
  } else {
    console.log("Cache hit!");
    res.send(entry.value);
  }
});

router.get("/entries", async (req, res) => {
  const entries = await Entry.find();
  const result = {};
  for (const entry of entries) {
    result[entry._id] = entry.value;
  }
  res.send(result);
});

router.put("/entries/:key", async (req, res) => {
  // console.log(req.body);
  const updatedEntry = await Entry.findByIdAndUpdate(req.params.key, {
    value: req.body,
  });
  if (updatedEntry) {
    res.send(updatedEntry.value);
  } else {
    res.status(400).send("Entity not found");
  }
});

router.delete("/entries/:key", async (req, res) => {
  const { key } = req.params;
  await Entry.findByIdAndDelete(key);
  res.status(204).send();
});

router.delete("/entries", async (req, res) => {
  await Entry.deleteMany();
  res.status(204).send();
});

module.exports = router;
