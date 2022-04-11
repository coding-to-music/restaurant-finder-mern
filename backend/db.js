const mongodb = require("mongodb");

let db;

const initializeDatabase = async (callback) => {
  if (db) return callback(null, db);

  try {
    const client = await mongodb.MongoClient.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    });
    db = client.db("sample_restaurants");
    callback(null, db);
  } catch (error) {
    console.error(error);
    callback(error);
  }
};

const getDatabase = () => {
  if (!db) throw new Error("There is no connection with the database");
  return db;
};

module.exports = {
  initializeDatabase,
  getDatabase,
};
