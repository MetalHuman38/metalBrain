'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class liked_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  liked_comment.init({
    comment_id: DataTypes.NUMBER,
    user_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'liked_comment',
  });
  return liked_comment;
};