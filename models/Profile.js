const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName : {
        type : String,
        required : true,
        trim: true,
        max: 20,
        min:2
    },
    lastName : {
        type : String,
        required : true,
        trim: true,
        max: 20,
        min:2
    },
    bio: {
        type: String,
        max: 200
    },
    birthday: {
        type: Date,
    },
    coverPhoto: {
        type: String,
        default: '/uploads/cover.jpg'
    },
    profilePicture: {
        type: String,
        default: '/uploads/avatar.png'
    },
    relationship: {
        type: String,
        default:''
    },
    address: {
        type: String,
        default:''
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

const Profile = model('Profile', profileSchema);
module.exports = Profile;