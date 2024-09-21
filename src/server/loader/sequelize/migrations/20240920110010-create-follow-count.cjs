'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('follow_counts', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Link to the 'users' table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      follower_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      following_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // ** Add primary key **
    await queryInterface.addConstraint('follow_counts', {
      fields: ['id'],
      type: 'unique',
      name: 'unique_user_follow_counts'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('follow_counts');
  }
};