'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('follows', {
      following_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      follower_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });

    // ** Add composite primary key **
    await queryInterface.addConstraint('follows', {
      fields: ['following_id', 'follower_id'],
      type: 'primary key',
      name: 'follows_pkey'
    });

    // ** Add unique constraint **
    await queryInterface.addConstraint('follows', {
      fields: ['following_id', 'follower_id'],
      type: 'unique',
      name: 'follows_unique_constraint'
    });

    // ** Add index ** //
    await queryInterface.addIndex('follows', ['following_id'], {
      name: 'follows_following_id_index'
    });

    await queryInterface.addIndex('follows', ['follower_id'], {
      name: 'follows_follower_id_index'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('follows');
  }
};