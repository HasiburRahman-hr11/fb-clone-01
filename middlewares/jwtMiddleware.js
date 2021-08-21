const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtVarify = (req,res,next) =>{
    const token = req.headers['x-access-token']

    if(token){
        jwt.verify(
            token,
            process.env.JWT_SWCRET,
            (err , decoded)=>{
                if(err){
                    return res.json({
                        isLoggedIn: false,
                        message: 'Authentication Failed.'
                    })
                }else{
                    req.user = {};
                    req.user.id = decoded.id;
                    req.user.firstName = decoded.firstName;
                    req.user.lastName = decoded.lastName;
                    req.user.profilePicture = decoded.profilePicture;
                    next()
                }
            }
        )
    }else{
        res.json({message:'Wrong Token' , isLoggedIn: false})
    }
}

module.exports = jwtVarify;