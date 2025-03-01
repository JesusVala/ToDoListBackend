"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import TaskController from '../controllers/TaskController';
const TaskController_1 = __importDefault(require("../controllers/TaskController"));
const router = express_1.default.Router();
router.get('/', TaskController_1.default.getAll);
router.post('/', TaskController_1.default.createOne);
router.route('/:taskId')
    .get(TaskController_1.default.getByID)
    .post(TaskController_1.default.updateOne)
    .delete(TaskController_1.default.deleteOne);
exports.default = router;
