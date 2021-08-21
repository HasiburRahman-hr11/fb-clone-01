const {Schema , model} = require('mongoose');

const userSchema = new Schema({
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
    email : {
        type : String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    profilePicture: {
        type: String,
        default: '/uploads/avatar.png'
    }
},{timestamps:true});

userSchema.index(
    {
        firstName: 'text',
        lastName: 'text'
    }
)

const User = model('User' , userSchema);
module.exports = User;