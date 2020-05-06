const { model, ObjectId } = require("mongoose");

const Entry = model("Entry", { _id: String, value: String });

module.exports = { Entry };
