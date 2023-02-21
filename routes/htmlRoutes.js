const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");


router.use(bodyParser.json());


// Router to serve the new note to the Notes.html file

router.get("./notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Router to serve the new note to the Index.html file to be displayed to user

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
