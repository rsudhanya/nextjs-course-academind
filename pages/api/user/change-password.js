import { MongoClient, ObjectId } from "mongodb";
import { getSession } from "next-auth/client";

import { hashPassword, verifyPassword } from "../../../lib/auth";

const mongoDbConnectionString = process.env.MONGODB_CONNECTION_STRING;

const handler = async (request, response) => {
  if (request.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: request });

  if (!session) {
    response.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = request.body.oldPassword;
  const newPassword = request.body.newPassword;

  const client = await MongoClient.connect(mongoDbConnectionString);
  const db = client.db();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    response.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    response.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  response
    .status(200)
    .json({ status: "success", message: "Password updated!" });
};

export default handler;
