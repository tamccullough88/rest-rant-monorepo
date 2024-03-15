'use strict';
import { Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';

module.exports = (sequelize: any, DataTypes: { SMALLINT: any; STRING: any; FLOAT: any; BOOLEAN: any; }) => {
  class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {

    static associate({ User, Place }: any) {
      Comment.belongsTo(Place, { as: 'place', foreignKey: 'place_id' })
      Comment.belongsTo(User, { as: 'author', foreignKey: 'author_id' })
    }

  };
  Comment.init({
    commentId: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    placeId: DataTypes.SMALLINT,
    authorId: DataTypes.SMALLINT,
    content: DataTypes.STRING,
    stars: DataTypes.FLOAT,
    rant: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'Comment',
  });
  return Comment;

};
export { };