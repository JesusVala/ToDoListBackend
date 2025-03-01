import express from "express";
import cors from "cors";
import morgan from "morgan";
import TaskControllers from "./controllers/TaskController";
import { ConnectDB, db } from "./db/MongoDBConnection";

import TasksRouter from "./routes/TasksRoute";

ConnectDB().then(() => console.log('DBConnected')).catch(err => console.log(err));

const app = express();
const port = 3001;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Index app");
});

app.use('/tasks', TasksRouter);


app.listen(port, () => console.log(`Working in http://localhost:${port}`));
