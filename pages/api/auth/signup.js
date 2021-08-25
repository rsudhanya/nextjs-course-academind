import { MongoClient, ObjectId } from "mongodb";
import { hashPassword } from "../../../lib/auth";

const mongoDbConnectionString = process.env.MONGODB_CONNECTION_STRING;

// /api/meetups
const handler = async (request, response) => {
  try {
    let result = null;
    if (request.method === "POST") {
      const { email, password } = request.body;
      if (!email || !password) {
        response.status(422).json({
          status: "error",
          payload: { message: "Invalid email or password." },
        });
      }

      const client = await MongoClient.connect(mongoDbConnectionString);
      const db = client.db();
      const usersCollection = db.collection("users");

      const hashedPassword = await hashPassword(password);
      result = await usersCollection.insertOne({
        email: email,
        password: hashedPassword,
      });

      client.close();
      response.status(201).json({
        status: "success",
        payload: { message: "User created" },
      });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({
      status: "error",
      payload: { error: error },
    });
  }
};

export default handler;
