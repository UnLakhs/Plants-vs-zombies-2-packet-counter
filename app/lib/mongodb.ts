//MONGODB connection
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI)
  throw new Error("Please add your Mongo URI to .env");

const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise:Promise<MongoClient> = client.connect();

export default clientPromise;
