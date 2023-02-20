import multer from 'multer'

let upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    },
})

export default upload = multer({ storage: storage })
