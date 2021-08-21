const {Schema , model} = require('mongoose');

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        requred: true
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body:{
        type:String,
        required:true
    },
    replies: [
        {
            user: {
                type:Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            body:{
                type:String,
                required:true
            },
            createdAt:{
                type: Date,
                default: new Date()
            }
        }
    ]
},{timestamps:true})

const Comment = model('Comment' , commentSchema);