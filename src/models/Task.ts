import { sequelize } from '../database/database.config';
import { Association, CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { Class } from './Class';
import { Goal } from './Goal';


export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare GoalId: ForeignKey<Goal['id']>;
  declare title: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare startDate: CreationOptional<number>;
  declare finishDate: CreationOptional<number>;
  declare status: CreationOptional<boolean>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Task.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    GoalId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Goal',
        key: 'id',
      },
      unique: false,
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING(1000)
    },
    startDate: {
      type: Sequelize.DATE
    },
    finishDate: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    tableName: 'Task'
  }
)
