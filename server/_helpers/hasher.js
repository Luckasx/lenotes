//https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/

"use strict";

const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.hash = async (password) => {
  try {
    return await bcrypt.genSalt(saltRounds, async function (err, salt) {
      if (err) {
        console.log(err);
      }
      let x = await bcrypt.hash(password, salt, function (err, hash) {
        // returns hash
        return hash;
      });

      return x;
    });
  } catch (err) {
    console.log(err);
  }
};
