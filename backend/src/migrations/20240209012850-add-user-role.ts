'use strict';

module.exports = {
  up: async (queryInterface: { addColumn: (arg0: string, arg1: string, arg2: { type: any; values: string[]; defaultValue: string; }) => any; }, Sequelize: { DataTypes: { ENUM: any; }; }) => {
    return queryInterface.addColumn('users', 'role', {
      type: Sequelize.DataTypes.ENUM,
      values: [
        'reviewer',
        'admin',
      ],
      defaultValue: 'reviewer'
    })
  },

  down: async (queryInterface: { removeColumn: (arg0: string, arg1: string) => any; }, Sequelize: any) => {
    return queryInterface.removeColumn('users', 'role')
  }
};
