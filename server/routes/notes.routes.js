const { Router } = require("express");
const router = Router();
const notesController = require("../controllers/notes.controller");

const auth = require('./../_helpers/auth')

router.get("/", async (req, res) => {
  let results = await notesController.find();

  res.send(results);
});

router.post("/", auth, async (req, res) => {
  let results = await notesController.insert(req, res);

  res.send(results);
});

module.exports = router;
