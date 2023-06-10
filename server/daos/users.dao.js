const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}`
);

exports.get = async (username) => {
  await client.connect();
  try {
    // query for movies that have a runtime less than 15 minutes
    const query = { username: username };

    const result = await client
      .db("lenotes")
      .collection("Users")
      .find(query)
      .project({ username: 1, _id: 0 })
      .toArray();

    if (result) {
      return result;
    } else {
      console.log(`No listings found with the name ..`);
      return [];
    }
  } catch (err) {
    console.log("err...." + err);
    return {
      msg: "There is a problem on the server. Please try again in a few momements.",
      status: 503,
    };
  }
};

exports.create = async (user) => {
  await client.connect();
  try {
    // query for movies that have a runtime less than 15 minutes

    const result = await client
      .db("lenotes")
      .collection("Users")
      .insertOne(user);

    if (result) {
      console.log(result);
      return { msg: "User Created." };
    } else {
      console.log(`No listings found with the name ..`);
      return [];
    }
  } catch (err) {
    switch (err.code) {
      case 11000:
        return {
          msg: "Username exists already please choose another one.",
          status: 409,
        };
      default:
        return {
          msg: "There is a problem on the server. Please try again in a few momements.",
          status: 503,
        };
    }
  } finally {
    await client.close();
  }
};

exports.login = async (data) => {
  await client.connect();

  let result = [];

  try {
    // query for movies that have a runtime less than 15 minutes
    const query = { username: data.username };

    result = await client
      .db("lenotes")
      .collection("Users")
      .find(query)
      .project({ username: 1, _id: 0, password: 1 })
      .toArray();
  } catch (err) {
    switch (err.code) {
      case 11000:
        return {
          msg: "Username exists already please choose another one.",
          status: 409,
        };
      default:
        return {
          msg: "There is a problem on the server. Please try again in a few moments.",
          status: 503,
        };
    }
  } finally {
    await client.close();
  }

  return result[0];
};

/**
 * It deletes previous refresh token and store the new one
 * @param {*} refreshToken Object containing username, rtoken and expires (date)
 * @returns Result from database insert
 */
exports.storeRefreshToken = async (refreshToken) => {
  await client.connect();

  try {
    //first delete previous refreshTokens of the user
    await client
      .db("lenotes")
      .collection("Tokens")
      .deleteMany({ username: refreshToken.username });

    //store the new token
    const result = await client
      .db("lenotes")
      .collection("Tokens")
      .insertOne({ refreshToken });

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
};

/**
 * It queries the database checking if a refresh token is still valid.
 * @param {*} data
 * @param {*} refreshToken
 * @returns
 */
exports.getRefreshToken = async (data, refreshToken) => {
  await client.connect();

  try {
    //check if the sent token is on db
    let result = await client
      .db("lenotes")
      .collection("Tokens")
      .findOne(
        {
          "refreshToken.username": data.username,
          "refreshToken.rtoken": refreshToken,
        }

        // { projection: { username: 1, _id: 0 } }
      );

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
};

/**
 * It queries the database deleting a used refresh token
 * @param {*} refreshToken
 * @returns
 */
exports.deleteToken = async (refreshToken) => {
  await client.connect();

  try {
    let result = await client.db("lenotes").collection("Tokens").deleteOne({
      "refreshToken.rtoken": refreshToken,
    });

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
};
