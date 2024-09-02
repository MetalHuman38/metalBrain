'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_stories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_stories.init({
    user_id: DataTypes.INTEGER,
    storyUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_stories',
  });
  return user_stories;
};