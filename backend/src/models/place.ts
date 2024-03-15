'use strict';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';


module.exports = (sequelize: any, DataTypes: { SMALLINT: any; STRING: any; INTEGER: any; }) => {

  class Place extends Model<InferAttributes<Place>, InferCreationAttributes<Place>>{


    static associate({ Comment }: any) {
      Place.hasMany(Comment, { foreignKey: 'place_id', as: 'comments' })
    }

  };

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
export { };