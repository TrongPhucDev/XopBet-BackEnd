import express from 'express'
import { ShoppingCartController } from '../controllers/cart/shoppingCart.controller'
import { VerifyToken } from '../middleware/verifyToken.middleware'

const router = express.Router()
router.get('/', VerifyToken, ShoppingCartController.GetAllProductInCart)
router.post('/addToCart/:id', VerifyToken, ShoppingCartController.AddToCart)
router.delete('/delete', VerifyToken, ShoppingCartController.DeletePostFromCart)
export default router
