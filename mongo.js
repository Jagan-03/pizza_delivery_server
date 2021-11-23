const { MongoClient } = require("mongodb");

// Mongodb Connection
const MONGO_URL =
  "mongodb+srv://jaganath:Michaelx7@cluster0.zy7jd.mongodb.net/pizza_house?retryWrites=true&w=majority";
const DATABASE_NAME = "pizza_house";

const mongo = {
  db: null,
  async connect() {
    try {
      const client = new MongoClient(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      console.log("Mongodb connection established");

      this.db = await client.db(DATABASE_NAME);
      console.log(`Connection to ${DATABASE_NAME} successfull`);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = mongo;
