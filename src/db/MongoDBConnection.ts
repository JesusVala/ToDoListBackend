//import { MongoClient } from "../../node_modules/mongodb/mongodb";

import { MongoClient } from "mongodb";

const uri =
   "mongodb+srv://jesusvaladezf97:jst1Pnk9lCJgyCC2@cluster0.4jrsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
let connection;

export async function ConnectDB() {
   try {
      connection = await client.connect();
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
   }
}

export const db = client.db("ToDoDB");
