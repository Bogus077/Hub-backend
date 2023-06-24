import { sequelize } from '../database/database.config';
import { Association, CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { Class } from './Class';
import { Kid } from './Kid';


export class Goal extends Model<InferAttributes<Goal>, InferCreationAttributes<Goal>> {
  declare id: CreationOptional<number>;
  declare KidId: ForeignKey<Kid['id']>;
  declare title: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare startDate: CreationOptional<number>;
  declare finishDate: CreationOptional<number>;
  declare isPrivate: CreationOptional<boolean>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Goal.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    KidId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Kid',
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
    isPrivate: {
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
    tableName: 'Goal'
  }
)
