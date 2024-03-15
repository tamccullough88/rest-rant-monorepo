'use strict';
module.exports = {
  up: async (queryInterface: { createTable: (arg0: string, arg1: { user_id: { allowNull: boolean; autoIncrement: boolean; primaryKey: boolean; type: any; }; first_name: { type: any; }; last_name: { type: any; }; email: { type: any; }; created_at: { allowNull: boolean; type: any; }; updated_at: { allowNull: boolean; type: any; }; }) => any; }, Sequelize: { INTEGER: any; STRING: any; DATE: any; }) => {
    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('users');
  }
};