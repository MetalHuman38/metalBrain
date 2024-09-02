'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init({
    caption: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    tags: DataTypes.STRING,
    likes_count: DataTypes.INTEGER,
    creator_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};