const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

//init app
const app = express();

//Middleware
app.use(express.json());

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
//routes
app.get("/books", (req, res) => {
  // current page
  const page = req.query.p || 0;
  const booksPerPage = 3;

  let books = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/book/:id", (req, res) => {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the documents" });
      });
  } else {
    res.status(500).json({ error: "Not a valid Id" });
  }
});

app.post("/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.delete("/book/:id", (req, res) => {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    db.collection("books")
      .deleteOne({ _id: new ObjectId(id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delte the documents" });
      });
  } else {
    res.status(500).json({ error: "Not a valid Id" });
  }
});

app.patch("/book/:id", (req, res) => {
  const updates = req.body;
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    db.collection("books")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not update the documents" });
      });
  } else {
    res.status(500).json({ error: "Not a valid Id" });
  }
});
