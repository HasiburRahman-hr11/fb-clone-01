const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file , cb)=>{
        cb(null , 'public/uploads')
    },
    filename : (req,file,cb) =>{
        cb(null , Date.now() + '_' + file.originalname.replace(' ','-'))
    }
});

let imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter:imageFilter
});

module.exports = upload;