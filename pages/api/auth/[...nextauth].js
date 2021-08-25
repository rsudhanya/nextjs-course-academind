import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient, ObjectId } from "mongodb";

import { verifyPassword } from "../../../lib/auth";

const mongoDbConnectionString = process.env.MONGODB_CONNECTION_STRING;

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await MongoClient.connect(mongoDbConnectionString);
        const db = client.db();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        client.close();
        
        if (!user) throw new Error("Invalid email or password");

        const isMatched = await verifyPassword(credentials.password, user.password);

        if (!isMatched) throw Error("Invalid username or password");

        return { email: user.email };
      },
    }),
  ],
});
