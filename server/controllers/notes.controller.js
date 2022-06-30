const dao = require("./../daos/notes.dao")

exports.find = async () => {
    let results = await dao.findNote();

    return results;
}