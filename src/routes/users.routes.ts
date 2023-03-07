import express from 'express'
import { CheckAuthorization } from '../middleware/CheckAuthorization.middleware'
import { UsersController } from '../controllers/users/users.controller'
import { VerifyToken } from '../middleware/verifyToken.middleware'

const router = express.Router()

const users = new UsersController()

router.get('/getme', VerifyToken, users.GetMe)
router.get('/all', VerifyToken, users.GetAllPetPost)
router.get('/', [VerifyToken, CheckAuthorization], users.GetAllUserAdmin)
router.delete(
    '/admin-delete',
    [VerifyToken, CheckAuthorization],
    users.AdminDeleteUser
)
router.patch('/update', VerifyToken, users.UpdateUser)
// router.get('/', VerifyToken, users.GettAllProductInCart)
export default router
