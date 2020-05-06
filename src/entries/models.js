const { model } = require("mongoose");

const Entry = model("Entry", {
  _id: String,
  value: String,
  expires_at: Number,
});

module.exports = { Entry };
