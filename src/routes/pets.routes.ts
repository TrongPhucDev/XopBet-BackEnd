import express from 'express'
import { VerifyToken } from '../middleware/verifyToken.middleware'
import { PetsController } from '../controllers/pets/pets.controller'
const router = express.Router()

const pets = new PetsController()

router.post('/', VerifyToken, pets.CreatePost)
router.patch('/update/:id', VerifyToken, pets.UpdatePost)
router.delete('/delete/:id', VerifyToken, pets.DeletePost)
router.get('/fetchAll', pets.GetAll)
// router.get('/search', pets.GetItemBySearch)
export default router
