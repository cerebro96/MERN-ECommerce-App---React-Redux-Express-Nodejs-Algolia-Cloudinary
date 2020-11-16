const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router() // for linux need to modify

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads/')
        //console.log(path.join(__dirname,'uploads/'))
        //cb(null,path.join(__dirname,'uploads/'))
      },
      filename: function (req, file, cb) {
        //cb(null, `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`)
        //cb(null, new Date().toISOString() + file.originalname)
        //cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname)
        //cb(null,file.originalname)
        cb(null, Math.random(4)+Date.now() + file.originalname);

      }
})

function checkFileType(file,cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    //console.log(extname)
    const mimetype = filetypes.test(file.mimetype)
    //console.log(file.mimetype)
    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
})

router.post('/', upload.single('image'),(req,res) => {
    res.send(`/${req.file.path}`)
})

exports.router = router