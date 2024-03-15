'use strict';

module.exports = {
  up: async (queryInterface: { addColumn: (arg0: string, arg1: string, arg2: { type: any; }) => any; }, Sequelize: { DataTypes: { STRING: any; }; }) => {
    return queryInterface.addColumn('users', 'password_digest', {
      type: Sequelize.DataTypes.STRING
    })
  },

  down: async (queryInterface: { removeColumn: (arg0: string, arg1: string) => any; }, Sequelize: any) => {
    return queryInterface.removeColumn('users', 'password_digest')
  }
};

