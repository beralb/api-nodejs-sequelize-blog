'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
        user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      // published: {
      //   field: 'created_at',
      //   type: Sequelize.DATE,
      // },
      // updated: {
      //   field: 'updated_at',
      //   type: Sequelize.DATE,
      // },
      created_at: {
        field: 'published',
        type: Sequelize.DATE,
      },
      updated_at: {
        field: 'updated',
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blog_posts');
  }
};
