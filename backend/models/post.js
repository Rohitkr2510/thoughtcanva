// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Post = sequelize.define('post', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title:{
      type: Sequelize.STRING,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
      },
  });
  
  module.exports = Post;

// const postSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     imageUrl: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     creator: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     }
// }, { timestamps: true })

// module.exports = mongoose.model('Post', postSchema);