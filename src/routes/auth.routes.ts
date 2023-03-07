import express from 'express'
import { AuthController } from '../controllers/auth/auth.controller'

const router = express.Router()
const auth = new AuthController()
router.post('/register', auth.Register)
router.post('/login', auth.Login)

router.post('/logout', auth.Logout)
router.post('/forgot', auth.ForgotPassword)

export default router
