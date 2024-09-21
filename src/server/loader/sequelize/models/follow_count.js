'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follow_count extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  follow_count.init({
    follower_count: DataTypes.INTEGER,
    following_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'follow_count',
  });
  return follow_count;
};