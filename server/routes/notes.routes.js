const { Router } = require("express");
const router = Router();
const notesController = require("../controllers/notes.controller");

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  let results = await notesController.find();

  res.send(results);
});

router.post("/", async (req, res) => {
  let results = await notesController.insert(req, res);

  res.send(results);
});

module.exports = router;
