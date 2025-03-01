"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBConnection_1 = require("../db/MongoDBConnection");
class TaskController {
    constructor() { }
    async getAll(req, res) {
        const { taskId } = req.query;
        try {
            console.log(taskId);
            const data = await MongoDBConnection_1.db.collection("tasks").find({}).toArray();
            res.status(201).json(data);
        }
        catch (error) {
            res.status(500).json({
                status: false,
                message: "server error",
            });
        }
    }
    async getByID(req, res) {
        const { taskId } = req.params;
        try {
            const data = await MongoDBConnection_1.db.collection("tasks").findOne({
                "taskId": Number(taskId),
            });
            if (!data) {
                throw new Error("Task not founded");
            }
            res.status(201).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    status: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "server error",
                });
            }
        }
    }
    async createOne(req, res) {
        const { taskId, tittle } = req.body;
        try {
            if (!taskId || !tittle) {
                throw new Error("Bad parameters");
            }
            const existTask = await MongoDBConnection_1.db.collection("tasks").findOne({
                "taskId": Number(taskId),
            });
            if (existTask) {
                throw new Error("Task already exists");
            }
            const newTask = await MongoDBConnection_1.db.collection("tasks").insertOne({
                "taskId": taskId,
                "tittle": tittle,
                "completed": false,
            });
            res.status(201).json({
                status: true,
                message: "Task created",
                value: newTask,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    status: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "server error",
                });
            }
        }
    }
    async updateOne(req, res) {
        const { taskId } = req.params;
        const { tittle, completed } = req.body;
        try {
            console.log("updating");
            const updatedData = {};
            if (tittle)
                updatedData.tittle = tittle;
            if (completed)
                updatedData.completed = completed;
            const data = await MongoDBConnection_1.db.collection("tasks").findOneAndUpdate({ "taskId": Number(taskId) }, { $set: updatedData }, { returnDocument: "after" });
            if (!data) {
                throw new Error("Task not founded");
            }
            res.status(201).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    status: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "server error",
                });
            }
        }
    }
    async deleteOne(req, res) {
        const { taskId } = req.params;
        try {
            const data = await MongoDBConnection_1.db.collection("tasks").findOneAndDelete({
                "taskId": Number(taskId),
            });
            if (!data) {
                throw new Error("Task not founded");
            }
            res.status(201).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    status: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "server error",
                });
            }
        }
    }
}
const TaskControllers = new TaskController();
exports.default = TaskControllers;
