export type BaseEditItem<T> = Partial<T> & { id: number };

export type CreateGoalType = {
  request: {
    KidId: number,
    title: string,
    description?: string,
    startDate: number,
    finishDate: number,
    isPrivate?: boolean,
  }
}

export type CreateTaskType = {
  request: {
    GoalId: number,
    title: string,
    description?: string,
    startDate: number,
    finishDate: number,
    status?: boolean,
  }
}

export type UpdateGoalType = {
  request: BaseEditItem<CreateGoalType['request']>
}

export type UpdateTaskType = {
  request: BaseEditItem<CreateTaskType['request']>
}