import { MongoClient, ObjectId } from "mongodb";

const mongoDbConnectionString = process.env.MONGODB_CONNECTION_STRING;

// /api/meetups
const handler = async (request, response) => {
  try {
    let result = null;
    if (request.method === "GET") {
      const client = await MongoClient.connect(mongoDbConnectionString);
      const db = client.db();
      const meetupsCollection = db.collection("meetups");

      const data = await meetupsCollection
        .find()
        .sort({ _id: -1 })
        .toArray();
      result = data.map((item) => {
        const d = { ...item, id: item._id.toString() };
        delete d._id;
        return d;
      });

      client.close();
      response.status(200).json({
        status: "success",
        payload: result,
      });
    } else if (request.method === "POST") {
      const client = await MongoClient.connect(mongoDbConnectionString);
      const db = client.db();
      const meetupsCollection = db.collection("meetups");

      const data = request.body;
      result = await meetupsCollection.insertOne(data);

      client.close();
      response.status(201).json({
        status: "success",
        payload: result,
      });
    }
  } catch (error) {
    response.status(400).json({
      status: "error",
      payload: { error: error },
    });
  }
};

export default handler;
