const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb://${process.env.MONGO_ADMIN}:${process.env.MONGO_PWD}@${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}`
);

//@TODO
//connect single time...

exports.findNote = async () => {
  await client.connect();
  try {

    // query for movies that have a runtime less than 15 minutes
    const query = { };

    const result = await client.db("lenotes").collection("Notes").find(query).toArray();

    

    if (result) {
      //await result.forEach(
    //     it => {
    //         console.log(it);
    //     }
    //   );

      return result;
    } else {
      console.log(`No listings found with the name ..`);
      return [];
    }
  } catch (err) {
    console.log("err...." + err);
  } finally {
    //await client.close();
  }
};
