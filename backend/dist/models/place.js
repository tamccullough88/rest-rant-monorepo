'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Place extends sequelize_1.Model {
        static associate({ Comment }) {
            Place.hasMany(Comment, { foreignKey: 'place_id', as: 'comments' });
        }
    }
    ;
    Place.init({
        placeId: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        cuisines: DataTypes.STRING,
        pic: DataTypes.STRING,
        founded: DataTypes.INTEGER
    }, {
        sequelize,
        underscored: true,
        modelName: 'Place',
    });
    return Place;
};
