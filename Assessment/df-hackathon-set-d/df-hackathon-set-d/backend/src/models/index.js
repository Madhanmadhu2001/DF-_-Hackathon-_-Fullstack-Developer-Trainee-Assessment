const sequelize = require('../config/db');
const User = require('./user');
const Item = require('./item');

module.exports = { sequelize, User, Item };
