const express = require("express");
const router = express.Router();
const storage = require("../db/storage");

// Router to delete notes from stoarge

router.delete("/notes/:id", (req, res) => {
  storage
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

// Router to GET notes from JSON DB and return as JSON

router.get("./notes", (req, res) => {
  storage
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// Router to POST a new note the user is wanting to save
// First passed into the JSON DB and then returned to user in the sidebar

router.post("./notes", (req, res) => {
  storage
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
