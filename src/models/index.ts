'use strict';
import { Class } from './Class';
import { Goal } from './Goal';
import { Kid } from './Kid';
import { Task } from './Task';
import { User } from './User';
import { UserRefresh } from './UserRefresh';


export {
  User,
  UserRefresh,
  Class,
  Kid,
  Goal,
  Task,
};

User.hasMany(UserRefresh, {
  sourceKey: 'id',
  foreignKey: 'UserId',
  as: 'refresh' // this determines the name in `associations`!
});
UserRefresh.belongsTo(User);

User.hasMany(Class, {
  sourceKey: 'id',
  foreignKey: 'UserId',
});
Class.belongsTo(User);

Class.hasMany(Kid, {
  sourceKey: 'id',
  foreignKey: 'ClassId',
});
Kid.belongsTo(Class);

Kid.hasMany(Goal, {
  sourceKey: 'id',
  foreignKey: 'KidId',
});
Goal.belongsTo(Kid);

Goal.hasMany(Task, {
  sourceKey: 'id',
  foreignKey: 'GoalId',
});
Task.belongsTo(Goal);
