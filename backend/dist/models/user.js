'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate({ Comment }) {
            User.hasMany(Comment, { as: 'author', foreignKey: 'author_id' });
        }
    }
    ;
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
    }, {
        sequelize,
        underscored: true,
        modelName: 'User',
    });
    return User;
};
