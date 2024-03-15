'use strict';
require('dotenv').config()

module.exports = {
  up: async (queryInterface: { bulkInsert: (arg0: string, arg1: { name: string; city: string; state: string; cuisines: string; pic: string; founded: number; created_at: Date; updated_at: Date; }[] | { place_id: any; author_id: any; rant: boolean; stars: number; content: string; created_at: Date; updated_at: Date; }[] | { first_name: string; last_name: string; email: string; created_at: Date; updated_at: Date; }[]) => any; sequelize: { query: (arg0: string) => [any] | PromiseLike<[any]>; }; }, Sequelize: any) => {

    await queryInterface.bulkInsert('users', [{
      first_name: 'John',
      last_name: 'Doe',
      email: 'example@example.com',
      created_at: new Date(),
      updated_at: new Date()
    }])

    const [users] = await queryInterface.sequelize.query(
      `SELECT user_id from users LIMIT 1;`
    );

    await queryInterface.bulkInsert('places', [
      {
        name: 'H-Thai-ML',
        city: 'Seattle',
        state: 'WA',
        cuisines: 'Thai, Pan-Asian',
        pic: `http://localhost:${process.env.PORT}/images/h-thai-ml-tables.jpg`,
        founded: 1989,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Coding Cat Cafe',
        city: 'Phoenix',
        state: 'AZ',
        cuisines: 'Coffee, Bakery',
        pic: `http://localhost:${process.env.PORT}/images/coffee-cat.png`,
        founded: 2020,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])

    const [places] = await queryInterface.sequelize.query(
      `SELECT place_id from places LIMIT 1;`
    );

    await queryInterface.bulkInsert('comments', [
      {
        place_id: places[0].place_id,
        author_id: users[0].user_id,
        rant: false,
        stars: 5.0,
        content: 'Wow, simply amazing food here. I highly recommend this to anyone visiting the area!',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface: { bulkDelete: (arg0: string, arg1: null, arg2: {}) => any; }, Sequelize: any) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('places', null, {});
    await queryInterface.bulkDelete('comments', null, {});
  }
};
