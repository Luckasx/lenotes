const dao = require("./../daos/users.dao");

const hasher = require("./../_helpers/hasher")

exports.create = async (user) => {

  delete user.rpassword;

  user.password = await hasher.hash(user.password);

  return dao.create(user);
};

exports.get = async(username) => {
  let results = await dao.get(username);

  return results;
}