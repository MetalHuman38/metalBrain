'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_activity.init({
    user_id: DataTypes.NUMBER,
    activity: DataTypes.STRING,
    activity_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_activity',
  });
  return user_activity;
};