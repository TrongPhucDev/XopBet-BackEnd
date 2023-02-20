import express from 'express'
import { VerifyToken } from '../middleware/verifyToken.middleware'
import { PetsController } from '../controllers/pets/pets.controller'
import multer from 'multer'
const router = express.Router()

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../../public/images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname)
//     },
// })

// const upload = multer({
//     dest: '../../public/images',
//     storage: storage,
//     limits: { fileSize: 1 * 1024 * 1024 },
// })

router.post('/', VerifyToken, PetsController.CreatePost)
router.patch('/update/:id', VerifyToken, PetsController.UpdatePost)
router.delete('/delete/:id', VerifyToken, PetsController.DeletePost)
router.get('/fetchAll', PetsController.GetAll)
// router.get('/search', PetsController.GetItemBySearch)
export default router
