// const fs = require('fs');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');
const cloudinary = require('../utils/cloudinary');

exports.profileGetController = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const profile = await Profile.findOne({ user: userId })
            .populate('posts')
            .populate({
                path: 'posts',
                populate: {
                    path: 'author',
                    model: 'User'
                }
            })
            .populate('followers')
            .populate('followings')

        if (!profile) {
            return res.status(400).json({
                message: 'Profile not found'
            })
        }

        res.status(200).json(profile)

    } catch (e) {
        console.log(e);
        next(e)
    }
}


exports.editProfileController = async (req, res, next) => {
    let { firstName, lastName, birthday, relationship, bio, address } = req.body
    const userId = req.params.userId
    try {

        const user = await User.findById(userId);
        let updateData = {};
        if (firstName !== '') updateData.firstName = firstName;
        if (lastName !== '') updateData.lastName = lastName;
        if (birthday !== '') updateData.birthday = birthday;
        if (relationship !== '') updateData.relationship = relationship;
        if (bio !== '') updateData.bio = bio;
        if (address !== '') updateData.address = address;


        if (!user) {
            return res.status(400).json({ success: false, message: 'No user found.' })
        }
        const profile = await Profile.findOneAndUpdate(
            { user: userId },
            { $set: updateData },
            { new: true }
        );

        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { firstName: profile.firstName, lastName: profile.lastName } },
            { new: true }
        )


        res.status(201).json({profile , success:true} );
    } catch (e) {
        next(e);
        console.log(e);
    }
}




exports.profilePictureController = async (req, res, next) => {
    const userId = req.params.userId
    if (req.file) {
        try {
            const profile = await Profile.findOne({ user: userId });

            if (!profile) {
                return res.status(400).json({
                    success: false,
                    message: 'No profile found'
                })
            }
            let oldProfilePicture = profile.profilePicture;
            let filePath = await cloudinary.uploader.upload(req.file.path)

            let newProfilePicture = filePath.secure_url;

            await Profile.findOneAndUpdate(
                { user: userId },
                { $set: { profilePicture: newProfilePicture } }
            );
            await User.findByIdAndUpdate(
                userId,
                { $set: { profilePicture: newProfilePicture } }
            );

            // if (oldProfilePicture !== '/uploads/avatar.png') {
            //     fs.unlink(`public${oldProfilePicture}`, (err) => {
            //         console.log(err)
            //     });
            // }

            res.status(201).json({
                newProfilePicture
            })

        } catch (e) {
            res.status(500).json({
                profilePicture: profile.profilePicture
            })
            next(e)
        }
    } else {
        res.status(500).json({
            profilePicture: profile.profilePicture
        })
    }
}



exports.coverPhotoController = async (req, res, next) => {
    const userId = req.params.userId
    if (req.file) {
        try {
            const profile = await Profile.findOne({ user: userId });

            if (!profile) {
                return res.status(400).json({
                    success: false,
                    message: 'No profile found'
                })
            }
            let oldcoverPhoto = profile.coverPhoto;
            let filePath = await cloudinary.uploader.upload(req.file.path)
            let newcoverPhoto = filePath.secure_url;

            await Profile.findOneAndUpdate(
                { user: userId },
                { $set: { coverPhoto: newcoverPhoto } }
            );

            // if (oldcoverPhoto !== '/uploads/cover.jpg') {
            //     fs.unlink(`public${oldcoverPhoto}`, (err) => {
            //         console.log(err)
            //     });
            // }

            res.status(201).json({
                newcoverPhoto
            })

        } catch (e) {
            res.status(500).json({
                coverPhoto: profile.coverPhoto
            })
            next(e)
        }
    } else {
        res.status(500).json({
            coverPhoto: profile.coverPhoto
        })
    }
}



exports.deleteProfileController = async (req, res, next) => {
    const userId = req.params.userId

    try {
        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(400).json({
                success: false,
                message: 'No profile found!'
            })
        }


        // if (profile.profilePicture !== '/uploads/avatar.png') {
        //     fs.unlink(`public${profile.profilePicture}`, (err) => {
        //         console.log(err)
        //     });
        // }
        // if (profile.coverPhoto !== '/uploads/cover.jpg') {
        //     fs.unlink(`public${profile.coverPhoto}`, (err) => {
        //         console.log(err)
        //     });
        // }

        await Profile.findOneAndDelete({ user: userId });
        await User.findByIdAndDelete(userId);
        await Post.deleteMany({ author: userId })



        res.status(200).json({
            success: true,
            message: 'Account Deleted Successfully.'
        })


    } catch (e) {
        next(e)
        console.log(e)
    }
}


exports.followUnfollowController = async (req, res, next) => {
    const userId = req.params.userId;
    const senderId = req.body.senderId;

    try {
        const profile = await Profile.findOne({ user: userId });
        if (profile.followers.includes(senderId)) {
            await Profile.findOneAndUpdate(
                { user: userId },
                { $pull: { followers: senderId } }
            )
            await Profile.findOneAndUpdate(
                { user: senderId },
                { $pull: { followings: userId } }
            )
        } else {
            await Profile.findOneAndUpdate(
                { user: userId },
                { $push: { followers: senderId } }
            )

            await Profile.findOneAndUpdate(
                { user: senderId },
                { $push: { followings: userId } }
            )
        }

        res.status(200).json({
            success: true,
            message: 'Successfull'
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}



exports.getAllFollowers = async (req, res, next) => {
    let userId = req.params.userId;
    try {
        const profile = await Profile.findById(userId)
            .populate('followers')
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: 'No user found.'
            })
        }

        res.status(200).json(profile)

    } catch (e) {

    }
}



exports.getAllFollowings = async (req, res, next) => {
    let userId = req.params.userId;
    try {
        const profile = await Profile.findById(userId)
            .populate('followings')
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: 'No user found.'
            })
        }

        res.status(200).json(profile)

    } catch (e) {

    }
}


exports.getAllUsersProfile = async (req,res,next) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(e){
        next(e)
    }
}