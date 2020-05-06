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
