const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const User = require('../models/User');
const Profile = require('../models/Profile');

// Register Controller
exports.authRegisterController = async (req, res, next) => {
    let { firstName, lastName, email, password } = req.body;
    try {

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                errorEmail: 'Email already exist!'
            })
        }

        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPass,
        })

        await newUser.save();

        const userProfile = new Profile({
            user: newUser._id,
            firstName,
            lastName,
            bio: '',
            relationship: '',
            posts: [],
            friends: []
        });

        await userProfile.save();

        // res.status(201).json(newUser);
        res.status(201).json({
            success: 'Registration Successful'
        })


    } catch (e) {
        console.log(e);
        next(e);
    }
}


// Login COntroller
exports.authLoginController = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                errorEmail: 'Invalid Email Address'
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({
                errorPass: 'Wrong Password'
            })
        }
        const payload = {
            id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture
        }

        jwt.sign(
            payload,
            process.env.JWT_SWCRET,
            {expiresIn:86400*3},
            (err, token)=>{
                if(err){
                    return res.json({
                        message: err
                    })
                }else{
                    return res.status(200).json({
                        message: 'Success',
                        token,
                        user: {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            profilePicture: user.profilePicture
                        }
                    })
                }
            }
        )


        // res.status(200).json(user);
        // res.status(200).json({
        //     success:true,
        //     message: 'Login Successful'
        // })

    } catch (e) {
        console.log(e);
        next(e)
    }
}



// exports.authLogoutController = async (req, res, next) => {
//     

//     try {
//         

//     } catch (e) {
//         console.log(e);
//         next(e)
//     }
// }

