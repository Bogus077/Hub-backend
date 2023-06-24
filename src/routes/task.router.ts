const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { createNewGoalRequest, createNewTaskRequest, removeGoalRequest, removeTaskRequest, updateGoalRequest, updateTaskRequest } from '../controllers/task.controller';

router.use([jsonParser]);
router.put('/addGoal', [verifyJWT], createNewGoalRequest);
router.put('/addTask', [verifyJWT], createNewTaskRequest);
router.post('/updateGoal', [verifyJWT], updateGoalRequest);
router.post('/updateTask', [verifyJWT], updateTaskRequest);
router.delete('/removeGoal', [verifyJWT], removeGoalRequest);
router.delete('/removeTask', [verifyJWT], removeTaskRequest);

