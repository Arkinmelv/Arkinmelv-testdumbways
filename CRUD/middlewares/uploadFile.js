//call package
const multer = require('multer');

//export data
//name
module.exports = (imageFile) => {
    //menentukan destinasi file ulpoad
    const storage = multer.diskStorage({
        destination : function(request, response, cb){
            cb(null, 'uploads') //folder yang akan menyimpan filenya 
        },
        filename: function(request , file, cb){
            cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, "")) //rename file upload    
        }
    })
//extensi
    const fileFilter = function(request, file, cb){
        if(file.fieldname === imageFile){
            if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
                request.fileValidationError = {
                    message: 'just upload image extension'
                };
                return cb(new Error('just upload image extension'), false)
            }
        }
        cb(null, true)
    }
    //size
    const sizeInMB = 10
    const maxSize = sizeInMB * 1024* 1000 //maksimal file ny adalah 10mb

    //generate multer upload
    const upload = multer ({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize
        }
    }).single(imageFile)

    //middleware
    return (req, res, next) => {
        upload(req, res, function(err){
            if(err) {
                if(err.code == 'LIMIT_FILE SIZE'){
                    req.session.message = {
                        type: 'danger',
                        message: 'Error, max file size 10mb'
                    }
                    return res.redirect(req.originalUrl)
                }
                req.session.message = {
                    type: 'danger',
                    message: err
                }
                req.flash('error', err)
                return res.redirect(req.originalUrl)
            }
            return next()
        })
    }

}

