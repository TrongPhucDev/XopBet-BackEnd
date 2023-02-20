import express from 'express'
import { VerifyToken } from '../middleware/verifyToken.middleware'
import { OrderController } from '../controllers/order/order.controrller'

const router = express.Router()
router.post('/addToOrder', VerifyToken, OrderController.AddPetsForOrderUser)
router.get('/', VerifyToken, OrderController.GetPetsForUserOrder)
export default router
