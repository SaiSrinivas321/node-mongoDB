const express = require("express");

//init app
const app = express();

//routes

app.get("/books", (req, res) => {
  res.json({ msg: "welcome to api" });
});

app.listen(8000, () => {
  console.log("app listening on port 8000");
});
