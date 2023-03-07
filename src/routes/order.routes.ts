import express from 'express'
import { VerifyToken } from '../middleware/verifyToken.middleware'
import { OrderController } from '../controllers/order/order.controrller'

const router = express.Router()
const order = new OrderController()
router.post('/addToOrder', VerifyToken, order.AddPetsForOrderUser)
router.get('/', VerifyToken, order.GetPetsForUserOrder)
export default router
