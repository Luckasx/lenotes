const dao = require("./../daos/users.dao");

const hasher = require("./../_helpers/hasher");

exports.create = async (user) => {
  delete user.rpassword;

  user.password = await hasher.hash(user.password);

  user.creation_date = await new Date();

  return dao.create(user);
};

exports.get = async (username) => {
  let results = await dao.get(username);

  return results;
};

exports.login = async (data) => {
  let results = await dao.login(data);

  if (!results.password) {
    return [];
  }

  let check = await hasher.compare(results, data);

  if(!check){
    return [];
  }
  
  delete results.password;

  return results;
};
