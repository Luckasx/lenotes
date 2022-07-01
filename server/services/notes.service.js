const dao = require("./../daos/notes.dao")
//const uuid = require( "uuid");

exports.find = async () => {
    let results = await dao.findNote();

    return results;
}

exports.insert = async (req, res) => {

    let note = {text: req.body.text};
    
    let results = await dao.insert(note);

    return results;
}