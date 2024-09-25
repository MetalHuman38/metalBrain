'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      activity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activity_type: {
        type: Sequelize.ENUM('like', 'comment', 'follow', 'unfollow', 'post'),
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      metadata: {
        type: Sequelize.JSON,
        defaultValue: { post_id: null, comment_id: null, user_id: null, message_id: null, notification_id: null, reaction_id: null, report_id: null, block_id: null, mute_id: null, unblock_id: null, unmute_id: null, unreaction_id: null, unreport_id: null, unblock_id: null, unmute_id: null },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_activities');
  }
};