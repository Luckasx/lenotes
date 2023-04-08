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

/**
 * 
 * @param {*} data Object with username and password 
 * @returns Array 
 */
exports.login = async (data) => {
  let results = await dao.login(data);

  //if the response is empty means the username doesnt exist in the database
  if (!results || !results.password) {
    return [];
  }

  let check = await hasher.compare(results, data);

  if (!check) {
    return [];
  }

  //remove the sent password and return an object informing the client that authentication is okay
  delete results.password;
  results.isAuthenticated = true;

  return results;
};

/**
 * Calls dao to store the refresh token
 * @param {*} refreshToken 
 */
exports.storeRefreshToken = async (refreshToken) => {
  await dao.storeRefreshToken(refreshToken)
}

/**
 * It Queries the database for a valid token
 * @param {*} data 
 * @param {*} refreshToken 
 * @returns 
 */
exports.checkRefreshToken = async (data, refreshToken) => {
  let result = await dao.getRefreshToken(data, refreshToken)

  if(result.username){
    result.isAuthenticated = true;
  }

  return result;
}

exports.deleteToken = async ( refreshToken) => {
  return await dao.deleteToken( refreshToken)
}