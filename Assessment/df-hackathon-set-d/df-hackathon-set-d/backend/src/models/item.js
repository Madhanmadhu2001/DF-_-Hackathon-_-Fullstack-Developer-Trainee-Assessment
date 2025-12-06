const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Item = sequelize.define('Item', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10,2) },
  created_by: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'items',
  timestamps: false
});

Item.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = Item;
