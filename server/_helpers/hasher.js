//https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
//https://sebhastian.com/bcrypt-node/

"use strict";

const bcrypt = require("bcrypt");

const saltRounds = 12;

exports.hash = async (password) => {
  try {
    return bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//results comes from DB
//data comes from http req
exports.compare = async (results, data) => {
  return await bcrypt.compare(data.password, results.password);
};
