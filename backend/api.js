import { MongoClient, ObjectId } from "mongodb";

const mongoDbConnectionString = process.env.MONGODB_CONNECTION_STRING;

export const getMeetupIds = async () => {
  let response;
  try {
    const client = await MongoClient.connect(mongoDbConnectionString);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const data = await meetupsCollection.find({}, { _id: 1 }).toArray();
    const result = data.map((item) => item._id.toString());
    client.close();
    response = {
      status: "success",
      payload: result,
    };
  } catch (error) {
    response = {
      status: "error",
      payload: { error: error },
    };
  }
  return response;
};

export const getMeetups = async () => {
  let response;
  try {
    const client = await MongoClient.connect(mongoDbConnectionString);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const data = await meetupsCollection.find().sort({ _id: -1 }).toArray();
    client.close();

    const result = data.map((item) => {
      const d = { ...item, id: item._id.toString() };
      delete d._id;
      return d;
    });

    response = {
      status: "success",
      payload: result,
    };
  } catch (error) {
    response = {
      status: "error",
      payload: { error: error },
    };
  }
  return response;
};

export const getMeetupById = async (id) => {
  let response;
  try {
    const client = await MongoClient.connect(mongoDbConnectionString);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.findOne({
      _id: new ObjectId(id),
    });
    delete result._id;
    result.id = id;
    client.close();
    response = {
      status: "success",
      payload: result,
    };
  } catch (error) {
    response = {
      status: "error",
      payload: { error: error },
    };
  }
  return response;
};
