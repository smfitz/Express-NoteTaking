const express = require("express");
const path = require("path");
const database = require("./db/db.json");
const fs = require("fs");
const PORT = process.env.PORT || 8001;
const uuid = require("uuid");
var cors = require("cors");
const { randomUUID } = require("crypto");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));

// returns the index.html file
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

// returns the notes.html file
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// returns all saved notes as JSON
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", function (err, text) {
    const dbData = JSON.parse(text);
    res.json(dbData);
  });
});

app.get("/notes/:id", (req, res) => {
  res.json(database[req.params.id]);
});

// POST request
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: randomUUID(),
    };

    // displaying existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // converting the string into JSON object
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

// Delete function

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    const dbData = JSON.parse(data);
    const newData = dbData.filter((database) => database.id !== req.params.id);
    fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
      if (err) console.error(err);
      res.json(newData);
    });
  });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
