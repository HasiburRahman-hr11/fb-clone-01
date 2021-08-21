const router = require('express').Router();

const {
    profileGetController , 
    editProfileController , 
    profilePictureController,
    coverPhotoController,
    deleteProfileController,
    followUnfollowController,
    getAllFollowers,
    getAllFollowings,
    getAllUsersProfile
} = require('../controller/profileController');

const upload = require('../middlewares/uploadMiddleware');

// All users
router.get('/all-user' , getAllUsersProfile);

// Get User Profile
router.get('/:userId' , profileGetController);

// Edit profile
router.post('/edit/:userId' , editProfileController);


// Upload profile pic
router.post('/upload-profile/:userId' , upload.single('profile-picture') , profilePictureController);
// Upload Cover Pic
router.post('/upload-cover/:userId' , upload.single('cover-photo') , coverPhotoController);

// Delete Profile and Account
router.delete('/delete/:userId' , deleteProfileController);


// Follow/Unfollow User
router.put('/follow/:userId' , followUnfollowController);


// All followers
router.get('/followers/:userId' , getAllFollowers);


// All followings
router.get('/followings/:userId' , getAllFollowings);




module.exports = router;