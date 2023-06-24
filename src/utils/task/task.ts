import { Class, Goal, Kid, Task, User } from "../../models";
import { CreateGoalType, CreateTaskType, UpdateGoalType, UpdateTaskType } from "../../schema/task";
import { createGoalRules, createTaskRules, updateGoalRules, updateTaskRules, validateData } from "../validationRules";

/**
 * Проверка на принадлежность цели пользователю
 */
export const isGoalBelongsToUser = async (UserId: number, GoalId: number) => {
  const goal = await Goal.findOne({
    where: { id: GoalId },
    include: {
      model: Kid,
      include: [{
        model: Class,
        include: [{
          model: User,
        }]
      }]
    },
  });

  return (goal as unknown as { Kid: { Class: { User: { id: number } } } })?.Kid?.Class?.User?.id === UserId;
}

/**
 * Проверка на принадлежность задачи пользователю
 */
export const isTaskBelongsToUser = async (UserId: number, TaskId: number) => {
  const task = await Task.findOne({
    where: { id: TaskId },
    include: {
      model: Goal,
      include: [{
        model: Kid,
        include: [{
          model: Class,
          include: [{
            model: User,
          }]
        }]
      }]
    },
  });

  return (task as unknown as { Goal: { Kid: { Class: { User: { id: number } } } } })?.Goal?.Kid?.Class?.User?.id === UserId;
}

/**
 * Создание новой цели
 */
export const createNewGoal = async (goalData: CreateGoalType['request']) => {
  validateData(goalData, createGoalRules);

  const createdGoal = await Goal.create(goalData)
  return createdGoal;
}

/**
 * Создание новой задачи
 */
export const createNewTask = async (taskData: CreateTaskType['request']) => {
  validateData(taskData, createTaskRules);

  const createdTask = await Task.create(taskData)
  return createdTask;
}

/**
 * Редактирование цели
 */
export const updateGoal = async (goalData: UpdateGoalType['request'], UserId: number) => {
  validateData(goalData, updateGoalRules);

  if (await isGoalBelongsToUser(UserId, goalData.id)) {
    const updatedGoal = await Goal.update(goalData, {
      where: {
        id: goalData.id
      }
    })

    return updatedGoal;
  } else {
    throw { errorMessage: 'Нет прав на изменение ученика. Это не ваш ученик' }
  }
}

/**
 * Редактирование задачи
 */
export const updateTask = async (taskData: UpdateTaskType['request'], UserId: number) => {
  validateData(taskData, updateTaskRules);

  if (await isTaskBelongsToUser(UserId, taskData.id)) {
    const updatedTask = await Task.update(taskData, {
      where: {
        id: taskData.id
      }
    })

    return updatedTask;
  } else {
    throw { errorMessage: 'Нет прав на изменение ученика. Это не ваш ученик' }
  }
}

/**
 * Удаление цели
 */
export const removeGoal = async (goalId: number, UserId: number) => {
  validateData({ id: goalId }, updateTaskRules);

  if (await isGoalBelongsToUser(UserId, goalId)) {
    await Goal.destroy({
      where: {
        id: goalId
      }
    })
  } else {
    throw { errorMessage: 'Нет прав на изменение ученика. Это не ваш ученик' }
  }
}

/**
 * Удаление задачи
 */
export const removeTask = async (taskId: number, UserId: number) => {
  validateData({ id: taskId }, updateTaskRules);

  if (await isTaskBelongsToUser(UserId, taskId)) {
    await Task.destroy({
      where: {
        id: taskId
      }
    })
  } else {
    throw { errorMessage: 'Нет прав на изменение ученика. Это не ваш ученик' }
  }
}