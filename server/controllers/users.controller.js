const service = require("./../services/users.service");

exports.create = async (user) => {
  let results = await service.create(user);

  return results;
};

exports.get = async (username) => {
  let results = await service.get(username);

  return results;
};

exports.login = async (data) => {
  let results = await service.login(data);

  return { data: results };
};
