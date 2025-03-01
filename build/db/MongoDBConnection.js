"use strict";
//import { MongoClient } from "../../node_modules/mongodb/mongodb";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.ConnectDB = ConnectDB;
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://jesusvaladezf97:jst1Pnk9lCJgyCC2@cluster0.4jrsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new mongodb_1.MongoClient(uri);
let connection;
async function ConnectDB() {
    try {
        connection = await client.connect();
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
exports.db = client.db("ToDoDB");
