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

export async function getAllKidsRequest(req: RequestWithJWT, res: Response) {
  try {
    const kids = await getAllKidsData();

    res.status(200).send(kids);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllClassesRequest(req: RequestWithJWT, res: Response) {
  try {
    const user = await getAllClassesData();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createClassRequest(req: RequestWithJWT, res: Response) {
  try {
    const newClass = await createClass(req.jwt.id, req.body);

    res.status(200).send(newClass);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function addKidsRequest(req: RequestWithJWT, res: Response) {
  try {
    const newClass = await createKids(req.body);

    res.status(200).send(newClass);
  } catch (error) {
    res.status(500).send(error);
  }
}