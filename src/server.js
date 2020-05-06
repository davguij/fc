const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./entries/routes");
const { connect } = require("mongoose");

const app = express();
app.use(bodyParser.text());

connect(process.env.MONGO_CONN_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/status", (req, res) => res.send({ success: true }));

app.use(routes);

app.listen(process.env.PORT || 3000, () => console.log(`App started`));
