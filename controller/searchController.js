const Post = require('../models/Post');
const User = require('../models/User');


exports.searchController = async (req, res, next) => {
    let term = req.query.term;
    try {
        const users = await User.find({
            $text: {
                $search: term
            }
        });

        const posts = await Post.find({
            $text: {
                $search: term
            }
        })
        

        if (users || posts) {
            res.status(200).json([...users, ...posts])
        } else {
            res.status(404).json({
                message: 'No result found'
            })
        }

    } catch (e) {
        next(e)
    }
}