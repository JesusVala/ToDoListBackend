import express from "express";
//import TaskController from '../controllers/TaskController';
import TaskControllers from '../controllers/TaskController';


const router = express.Router();



router.get('/', TaskControllers.getAll);
router.post('/', TaskControllers.createOne);

router.route('/:taskId')
    .get(TaskControllers.getByID)
    .post(TaskControllers.updateOne)
    .delete(TaskControllers.deleteOne);

export default router;
