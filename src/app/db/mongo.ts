import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI!;

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db("next_project");
