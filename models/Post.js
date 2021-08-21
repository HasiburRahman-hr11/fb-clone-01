const {Schema , model} = require('mongoose');

const postSchema = new Schema({
    description: String,
    thumbnail: String,
    author:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type:Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{timestamps:true});

postSchema.index(
    {
        description: 'text'
    }
);

const Post = model('Post' , postSchema);

module.exports = Post;