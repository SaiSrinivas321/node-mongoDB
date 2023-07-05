const express = require("express");
const { connectToDb, getDb } = require("./db");

//init app
const app = express();

//routes
app.get("/books", (req, res) => {
  res.json({ msg: "welcome to api" });
});

//DB connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(8000, () => {
      console.log("app listening on port 8000");
    });
    db = getDb();
  }
});
