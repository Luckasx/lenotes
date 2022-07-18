const dao = require("./../daos/notes.dao");

exports.find = async () => {
  let results = await dao.findNote();

  return results;
};

exports.insert = async (req) => {
  let note = {
    text: req.body.text,
    visibility: req.body.visibility,
    backcolor: req.body.backcolor,
    creationDate: Date()
  };

  let results = await dao.insert(note);

  return results;
};
