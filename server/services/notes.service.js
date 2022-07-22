const dao = require("./../daos/notes.dao");

exports.find = async () => {
  return dao.findNote();
};

exports.insert = async (req) => {
  let note = {
    text: req.body.text,
    visibility: req.body.visibility,
    backcolor: req.body.backcolor,
    creationDate: Date()
  };

  return  dao.insert(note);

  
};
