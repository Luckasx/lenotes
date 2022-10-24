const service = require("./../services/users.service")

exports.create = async (user) => {
    let results = await service.create(user);

    return results;
}