'use strict';

/*
 ╔═══════════════════════════════════════════════════════════════════════╗
 ║ JSON Server with faker.js                                             ║
 ╟───────────────────────────────────────────────────────────────────────╢
 ║ https://github.com/typicode/json-server                               ║
 ║ https://egghead.io/lessons/nodejs-creating-demo-apis-with-json-server ║
 ║                                                                       ║
 ║ https://github.com/marak/Faker.js                                     ║
 ║ http://marak.com/faker.js/                                            ║
 ╚═══════════════════════════════════════════════════════════════════════╝
 */

const faker = require('faker');
const _ = require('lodash');

/**
 * Models
 */
const _todoModel = (num) => {
    return {
        id: num,
        title: faker.lorem.words(),
        completed: faker.random.boolean(),
        checked: faker.random.boolean()
    }
};

/**
 * Mock Data API
 */
const fakeData = {
    todos: _.times(5, (num) => _todoModel(num))
};

module.exports = fakeData;
