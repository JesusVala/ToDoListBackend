"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const MongoDBConnection_1 = require("./db/MongoDBConnection");
const TasksRoute_1 = __importDefault(require("./routes/TasksRoute"));
(0, MongoDBConnection_1.ConnectDB)().then(() => console.log('DBConnected')).catch(err => console.log(err));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Index app");
});
app.use('/tasks', TasksRoute_1.default);
app.listen(port, () => console.log(`Working in http://localhost:${port}`));
