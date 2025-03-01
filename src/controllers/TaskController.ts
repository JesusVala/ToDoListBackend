import { Request, Response } from "express";
import { db } from "../db/MongoDBConnection";

class TaskController {
    constructor() {}

    async getAll(req: Request, res: Response) {
        const { taskId } = req.query;
        try {
            console.log(taskId);
            const data = await db.collection("tasks").find({}).toArray();
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "server error",
            });
        }
    }

    async getByID(req: Request, res: Response) {
        const { taskId } = req.params;
        try {
            const data = await db.collection("tasks").findOne({
                "taskId": Number(taskId),
            });

            if (!data) {
                throw new Error("Task not founded");
            }

            res.status(201).json(data);
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    status: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: "server error",
                });
            }
        }
    }

    async createOne(req: Request, res: Response) {
        const { taskId, tittle } = req.body;
        try {
            if (!taskId || !tittle) {
                throw new Error("Bad parameters");
            }

            const existTask = await db.collection("tasks").findOne({
                "taskId": Number(taskId),
            });

            if (existTask) {
                throw new Error("Task already exists");
            }

            const newTask = await db.collection("tasks").insertOne({
                "taskId": taskId,
                "tittle": tittle,
                "completed": false,
            });

            res.status(201).json({
                status: true,
                message: "Task created",
                value: newTask,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    status: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: "server error",
                });
            }
        }
    }

    async updateOne(req: Request, res: Response) {
        const { taskId } = req.params;
        const { tittle, completed } = req.body;
        try {
            console.log("updating");
            const updatedData: { [key: string]: any } = {};

            if (tittle) updatedData.tittle = tittle;
            if (completed) updatedData.completed = completed;

            const data = await db.collection("tasks").findOneAndUpdate(
                { "taskId": Number(taskId) },
                { $set: updatedData },
                { returnDocument: "after" },
            );

            if (!data) {
                throw new Error("Task not founded");
            }

            res.status(201).json(data);
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    status: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: "server error",
                });
            }
        }
    }

    async deleteOne(req: Request, res: Response) {
        const { taskId } = req.params;
        try {
            const data = await db.collection("tasks").findOneAndDelete({
                "taskId": Number(taskId),
            });

            if (!data) {
                throw new Error("Task not founded");
            }

            res.status(201).json(data);
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    status: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: "server error",
                });
            }
        }
    }
}

const TaskControllers = new TaskController();

export default TaskControllers;
