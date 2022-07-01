const service = require("./../services/notes.service")

exports.find = async () => {
    let results = await service.find();

    return results;
}

exports.insert = async (req, res) => {
    
    let results = await service.insert(req, res);

    return results;
}