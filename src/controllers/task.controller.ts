import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import { sequelize } from '../database/database.config';
import { User } from '../models/index';
import { createRefreshToken, createToken } from '../utils/token';
import { JwtPayload } from 'src/middlewares/authJwt';
import { CreateUserType, LoginUserType, RequestWithJWT } from '../schema/user';
import { getAllUserData, getUserData } from '../utils/user/user';
import { createClass, createKids, getAllClassesData, getAllKidsData } from '../utils/kid/kid';
import { createNewGoal, createNewTask, removeGoal, removeTask, updateGoal, updateTask } from '../utils/task/task';

export async function createNewGoalRequest(req: RequestWithJWT, res: Response) {
  try {
    const goal = await createNewGoal(req.body);

    res.status(200).send(goal);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createNewTaskRequest(req: RequestWithJWT, res: Response) {
  try {
    const task = await createNewTask(req.body);

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateGoalRequest(req: RequestWithJWT, res: Response) {
  try {
    const goal = await updateGoal(req.body, req.jwt.id);

    res.status(200).send(goal);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateTaskRequest(req: RequestWithJWT, res: Response) {
  try {
    const task = await updateTask(req.body, req.jwt.id);

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function removeGoalRequest(req: RequestWithJWT, res: Response) {
  try {
    await removeGoal(req.body, req.jwt.id);

    res.status(200).send('Цель удалена');
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function removeTaskRequest(req: RequestWithJWT, res: Response) {
  try {
    await removeTask(req.body, req.jwt.id);

    res.status(200).send('Задача удалена');
  } catch (error) {
    res.status(500).send(error);
  }
}