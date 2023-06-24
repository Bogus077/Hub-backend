import Validator, { Rules } from 'validatorjs';

export function validateData(data: { [key: string | number]: string | number | boolean }, rules: Rules) {
  const validation = new Validator(data, rules);

  if (validation.fails()) throw { errorMessage: validation.errors.all() };
}

//user
export const userSignUpRules = {
  phone: 'string|required',
  password: 'string|required',
  name: 'string|required',
  lastName: 'string|required',
}

export const isUserExistsRules = {
  phone: 'string|required',
}

export const loginRules = {
  phone: 'string|required',
  password: 'string|required',
}

export const createCheckListRules = {
  title: 'string|required',
}

//kid
export const addClassRules = {
  name: 'string|required',
  UserId: 'integer|required',
}

export const addKidRules = {
  name: 'string|required',
  lastName: 'string|required',
  ClassId: 'integer|required',
}

//tasks
export const createGoalRules = {
  KidId: 'integer|required',
  title: 'string|required',
  startDate: 'integer|required',
  finishDate: 'integer|required',
}

export const createTaskRules = {
  GoalId: 'integer|required',
  title: 'string|required',
  startDate: 'integer|required',
  finishDate: 'integer|required',
}

export const updateGoalRules = {
  id: 'integer|required',
}

export const updateTaskRules = {
  id: 'integer|required',
}