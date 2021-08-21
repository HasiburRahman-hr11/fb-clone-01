exports.homeController = (req,res,next)=>{
    res.json({
        isLoggedIn:true , 
        user:req.user
    })
}