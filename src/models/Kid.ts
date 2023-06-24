import { sequelize } from '../database/database.config';
import { Association, CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { Class } from './Class';


export class Kid extends Model<InferAttributes<Kid>, InferCreationAttributes<Kid>> {
  declare id: CreationOptional<number>;
  declare ClassId: ForeignKey<Class['id']>;
  declare name: CreationOptional<string>;
  declare lastName: CreationOptional<string>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Kid.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ClassId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Class',
        key: 'id',
      },
      unique: false,
    },
    name: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
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
    tableName: 'Kid'
  }
)
