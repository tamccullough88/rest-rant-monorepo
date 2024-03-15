'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface: { bulkInsert: (arg0: string, arg1: { first_name: string; last_name: string; email: string; role: string; password_digest: any; created_at: Date; updated_at: Date; }[]) => any; }, Sequelize: any) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'YOUR FIRST NAME',
      last_name: 'YOUR LAST NAME',
      email: 'admin@example.com',
      role: 'admin',
      password_digest: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface: { bulkDelete: (arg0: string, arg1: { email: string; }) => any; }, Sequelize: any) => {
    await queryInterface.bulkDelete('users', {
      email: 'admin@example.com'
    })
  }
}

