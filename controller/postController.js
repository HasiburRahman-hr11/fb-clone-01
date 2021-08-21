const Post = require('../models/Post');
const User = require('../models/User');
const Profile = require('../models/Profile');
// const fs = require('fs');
const cloudinary = require('../utils/cloudinary');


exports.createPostController = async (req, res, next) => {
    const { description, userId } = req.body;

    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                error: "You must login to create a post!"
            })
        } else {
            const newPost = new Post({
                description,
                author: userId,
                likes: [],
                comments: []
            })
            if (req.file) {
                let filePath = await cloudinary.uploader.upload(req.file.path)
                newPost.thumbnail = filePath.secure_url;
            }

            await newPost.save();

            await Profile.findOneAndUpdate(
                { user: userId },
                { $push: { 'posts': newPost } }
            );


            const profile = await Profile.findOne({ user: userId })
            const followingIds = profile.followings.map(fId => fId)

            const posts = await Post.find({ author: { $in: [...followingIds, userId] } })
                .populate('author')

            res.status(200).json(posts);

        }



    } catch (e) {
        console.log(e);
        next(e);
    }
}


exports.getAllPostsController = async (req, res, next) => {
    const userId = req.body.userId
    try {

        const profile = await Profile.findOne({ user: userId })
        const followingIds = profile.followings.map(fId => fId)

        const posts = await Post.find({ author: { $in: [...followingIds, userId] } })
            .populate('author')

        res.status(200).json(posts);
    } catch (e) {
        console.log(e);
        next(e)
    }
}



exports.postLikeController = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.body.userId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: 'No post found'
            })
        }

        if (!post.likes.includes(userId)) {
            await Post.findByIdAndUpdate(
                postId,
                { $push: { likes: userId } }
            )
            res.status(200).json({
                success: true,
                liked: true,
                totalLikes: post.likes.length
            })
        } else {
            await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } }
            )
            res.status(200).json({
                success: true,
                liked: false,
                totalLikes: post.likes.length
            })
        }




    } catch (e) {
        next(e)
    }
}



exports.deletePostController = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.body.userId;
    try {

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(400).json({
                success: false,
                message: 'Post not found'
            })
        } else {
            // if (post.thumbnail) {
            //     fs.unlink(`public${post.thumbnail}`, (err) => {
            //         console.log(err)
            //     })
            // }
            await Post.findByIdAndDelete(postId);

            const profile = await Profile.findOne({ user: userId })
            const followingIds = profile.followings.map(fId => fId)

            const posts = await Post.find({ author: { $in: [...followingIds, userId] } })
                .populate('author')

            res.status(200).json(posts);
        }


    } catch (e) {
        next(e)
        console.log(e)
    }
}