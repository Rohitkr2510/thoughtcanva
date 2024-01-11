// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resetToken: Sequelize.STRING,
    resetTokenExpiration: Sequelize.DATE
});

module.exports = User;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: Object,
//         default: 'I am new!'
//     },
//     posts: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'Post'
//         }
//     ]
// })

// module.exports = mongoose.model('User', userSchema);