const dao = require("./../daos/users.dao");

const hasher = require("./../_helpers/hasher")

exports.create = async (user) => {

  user.password = await hasher.hash(user.password);

  return dao.create(user);
};