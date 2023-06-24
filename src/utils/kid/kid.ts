import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validateData, isUserExistsRules, loginRules, userSignUpRules, addClassRules, addKidRules } from '../validationRules';
import { sequelize } from '../../database/database.config';
import { Class, Kid, User, UserRefresh } from '../../models/index';
import { createRefreshToken, createToken } from '../token';
import { CreateClassType, CreateKidsType } from '../../schema/kid';
import axios from 'axios';

/**
 * Получение данных всех учеников
 */
export const getAllKidsData = async () => {
  const kids = await Kid.findAll()
  return kids;
}

/**
 * Получение всех классов
 */
export const getAllClassesData = async () => {
  const classes = await Class.findAll({
    include: Kid,
  });
  return classes;
}

/**
 * Создание класса
 */
export const createClass = async (UserId: number, classData: CreateClassType['request']) => {
  validateData({ ...classData, UserId }, addClassRules);
  const newClass = await Class.create({ ...classData, UserId })
  return newClass;
}

/**
 * Добавление учеников
 */
export const createKids = async (kids: CreateKidsType['request']) => {
  for (let kid of kids) {
    validateData(kid, addKidRules);
  }

  const createdKids = await Kid.bulkCreate(kids);

  return createdKids;
}