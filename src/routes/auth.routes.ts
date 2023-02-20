import express from 'express'
import { AuthController } from '../controllers/auth/auth.controller'
import { check, body, validationResult } from 'express-validator'

const router = express.Router()
router.post('/register', AuthController.Register)
router.post(
    '/login',
    [body('email').not().isEmail().isEmpty(), body('password').not().isEmpty()],
    AuthController.Login
)

router.post('/logout', AuthController.Logout)
router.post('/forgot', AuthController.ForgotPassword)

export default router
