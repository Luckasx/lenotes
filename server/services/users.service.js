const dao = require("./../daos/users.dao");

exports.create = async (user) => {
  return dao.create(user);
};