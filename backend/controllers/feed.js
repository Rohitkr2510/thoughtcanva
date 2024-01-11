const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const io = require('../socket');
const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;

    try {
        const data = await Post.findAndCountAll({
            limit: perPage,
            offset: (currentPage - 1) * perPage,
            order: [['updatedAt', 'DESC']]
        });

        const { count: totalItems, rows: posts } = data;
        //   console.log(posts)

        const postsWithUserData = posts.map(async (post) => {
            const user = await User.findByPk(post.userId, { attributes: ['name'] });
            return {
                ...post.dataValues,
                name: user.name,
            };
        });

        // Wait for all user data to be fetched
        const postsWithUserDataResolved = await Promise.all(postsWithUserData);
        console.log(postsWithUserData)

        res.status(200).json({
            message: 'Fetched posts successfully.',
            posts: postsWithUserDataResolved,
            totalItems: totalItems
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};





exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.')
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path.replace("\\", "/");
    let creator;

    //Create post in db
    const post = Post.create({
        title: title,
        content: content,
        imageUrl: imageUrl,
        userId: req.userId,
    })
    try {
        const user = await User.findByPk(req.userId);

        creator = user;

        io.getIO().emit('posts', { action: 'create', post: { ...post._doc, creator: { id: req.userId, name: user.name } } })
        // console.log(creator);
        res.status(201).json({
            message: 'Post created successfully!',
            post: post,
            creator: { _id: creator._id, name: creator.name }
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getPost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findByPk(postId)
        if (!post) {
            const error = new Error('Count not find post');
            error.statusCode = 404;
            throw error
        }
        // console.log(post);
        res.status(200).json({ message: 'Post fetched', post: post })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.')
        error.statusCode = 422;
        throw error;
    }
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if (req.file) {
        imageUrl = req.file.path.replace("\\", "/");
    }
    if (!imageUrl) {
        const error = new Error('No file picked');
        error.statusCode = 422;
        throw error;
    }
    try {
        const post = await Post.findByPk(postId)
        console.log(post)
        if (!post) {
            const error = new Error('Count not find post');
            error.statusCode = 404;
            throw error
        }
        if (post.userId.toString() !== req.userId.toString()) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        }
        if (imageUrl !== post.imageUrl) {
            clearImage(post.imageUrl);
        }
        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        const result = await post.save();

        io.getIO().emit(
            'posts',
            {
                action: 'update',
                post: result,
            })

        res.status(200).json({
            message: 'Post updated',
            post: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findByPk(postId)

        if (!post) {
            const error = new Error('Could not find post');
            error.statusCode = 404;
            throw error
        }
        if (post.userId.toString() !== req.userId.toString()) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        }
        //check logged in user
        clearImage(post.imageUrl);
        await post.destroy();

        io.getIO().emit('posts', { action: 'delete', post: postId })
        res.status(200).json({
            message: 'Deleting the post Successful',
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);

    }
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};