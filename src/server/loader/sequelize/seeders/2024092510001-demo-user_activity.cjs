'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('user_activities', [{
      user_id: 1,
      activity: 'created a post',
      activity_type: 'post',
      metadata: JSON.stringify({ post_id: 101 }),
      created_at: new Date()
    },
    {
      user_id: 2,
      activity: 'liked a post',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101 }),
      created_at: new Date()
    },
    {
      user_id: 1,
      activity: 'commented on a post',
      activity_type: 'comment',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 3,
      activity: 'followed a user',
      activity_type: 'follow',
      metadata: JSON.stringify({ user_id: 2 }),
      created_at: new Date()
    },
    {
      user_id: 3,
      activity: 'unfollowed a user',
      activity_type: 'unfollow',
      metadata: JSON.stringify({ user_id: 2 }),
      created_at: new Date()
    },
    {
      user_id: 1,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 2,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 1,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 2,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 1,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 2,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 1,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 2,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    },
    {
      user_id: 1,
      activity: 'liked a comment',
      activity_type: 'like',
      metadata: JSON.stringify({ post_id: 101, comment_id: 202 }),
      created_at: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('user_activities', null, {});

  }
};
