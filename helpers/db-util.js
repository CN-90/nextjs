import { MongoClient } from "mongodb";

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}

export const connectDatabase = async () => {
  return MongoClient.connect(
    `mongodb+srv://CN90:${process.env.DB_PASSWORD}@cnrl.snedz.mongodb.net/events?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  return db.collection(collection).insertOne(document);
};
