const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'blogdb',
     'root',
      'Rohit2510@', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;