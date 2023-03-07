import express from 'express'
import { ShoppingCartController } from '../controllers/cart/shoppingCart.controller'
import { VerifyToken } from '../middleware/verifyToken.middleware'

const router = express.Router()
const cart = new ShoppingCartController()
router.get('/', VerifyToken, cart.GetAllProductInCart)
router.post('/addToCart/:id', VerifyToken, cart.AddToCart)
router.delete('/delete', VerifyToken, cart.DeletePostFromCart)
export default router
