const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

const {
    createPostController , 
    getAllPostsController , 
    postLikeController , 
    deletePostController
} =require('../controller/postController');

const upload = require('../middlewares/uploadMiddleware');

// create post
router.post('/create-post' , upload.single('post-thumbnail') , createPostController);

// Get all Post
router.post('/' , getAllPostsController);

// Like / Unlike
router.put('/like/:postId' , postLikeController);

// Delete Post
router.delete('/delete/:postId' , deletePostController)

module.exports = router;