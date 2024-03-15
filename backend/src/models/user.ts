'use strict';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';

module.exports = (sequelize: any, DataTypes: { SMALLINT: any; STRING: any; ENUM: any; }) => {
  class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    static associate({ Comment }: any) {
      User.hasMany(Comment, { as: 'author', foreignKey: 'author_id' })
    }

  };

  User.init({
    userId: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: [
        'reviewer',
        'admin',
      ],
    },
    passwordDigest: DataTypes.STRING
  },
    {
      sequelize,
      underscored: true,
      modelName: 'User',
    });
  return User;
};

export { };