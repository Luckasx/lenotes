const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb://${process.env.MONGO_ADMIN}:${process.env.MONGO_PWD}@${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}`
);

exports.get = async (username) => {
  await client.connect();
  try {
    // query for movies that have a runtime less than 15 minutes
    const query = { username: username };

    const result = await client
      .db("lenotes")
      .collection("Users")
      .find(query).project( { username: 1, _id: 0 })
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

exports.login = async(data) => {


    await client.connect();

    try {
      // query for movies that have a runtime less than 15 minutes
      const query = { username: data };
  
      const result = await client
        .db("lenotes")
        .collection("Users")
        .find(query).project( { username: 1, _id: 0 })
        .toArray();

        if (result) {
          console.log(result);
          return { msg: "Sign in ok." };
        } else {
          console.log(`No user found with the name ..`);
          return [];
        }
    }
   catch (err) {
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


  return results;
}
