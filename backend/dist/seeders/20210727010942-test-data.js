'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('users', [{
                first_name: 'John',
                last_name: 'Doe',
                email: 'example@example.com',
                created_at: new Date(),
                updated_at: new Date()
            }]);
        const [users] = yield queryInterface.sequelize.query(`SELECT user_id from users LIMIT 1;`);
        yield queryInterface.bulkInsert('places', [
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
        ]);
        const [places] = yield queryInterface.sequelize.query(`SELECT place_id from places LIMIT 1;`);
        yield queryInterface.bulkInsert('comments', [
            {
                place_id: places[0].place_id,
                author_id: users[0].user_id,
                rant: false,
                stars: 5.0,
                content: 'Wow, simply amazing food here. I highly recommend this to anyone visiting the area!',
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('users', null, {});
        yield queryInterface.bulkDelete('places', null, {});
        yield queryInterface.bulkDelete('comments', null, {});
    })
};
