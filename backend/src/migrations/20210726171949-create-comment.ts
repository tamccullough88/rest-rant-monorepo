'use strict';
module.exports = {
  up: async (queryInterface: { createTable: (arg0: string, arg1: { comment_id: { allowNull: boolean; autoIncrement: boolean; primaryKey: boolean; type: any; }; place_id: { type: any; }; stars: { type: any; }; content: { type: any; }; rant: { type: any; }; author_id: { type: any; }; created_at: { allowNull: boolean; type: any; }; updated_at: { allowNull: boolean; type: any; }; }) => any; }, Sequelize: { INTEGER: any; SMALLINT: any; FLOAT: any; STRING: any; BOOLEAN: any; DATE: any; }) => {
    await queryInterface.createTable('comments', {
      comment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      place_id: {
        type: Sequelize.SMALLINT
      },
      stars: {
        type: Sequelize.FLOAT
      },
      content: {
        type: Sequelize.STRING
      },
      rant: {
        type: Sequelize.BOOLEAN
      },
      author_id: {
        type: Sequelize.SMALLINT
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
  },
  down: async (queryInterface: { dropTable: (arg0: string) => any; }, Sequelize: any) => {
    await queryInterface.dropTable('comments');
  }
};