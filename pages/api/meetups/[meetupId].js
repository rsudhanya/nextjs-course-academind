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

      const id = request.query.meetupId;
      if (ObjectId.isValid(id)) {
        result = await meetupsCollection.findOne(
          {
            _id: new ObjectId(id),
          },
        );
        delete result._id;
        result.id = id;
      }
      
      client.close();
      response.status(200).json({
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
