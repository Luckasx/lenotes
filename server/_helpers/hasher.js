//https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/

"use strict";

const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.hash = async (password) => {
  try {
    return bcrypt.hash(password, saltRounds);    
  } catch (err) {
    console.log(err);
  }
};
