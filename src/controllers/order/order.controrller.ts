import HttpException from '../../utils/HttpException'
import { ShoppingCart } from './../../entity/cart.entity'
import { Order } from './../../entity/order.entity'
import { Pets } from './../../entity/pets.entity'
import { Users } from './../../entity/users.entity'
import { AppDataSource } from './../../utils/data-source'
import { Request, Response } from 'express'

export class OrderController {
    async AddPetsForOrderUser(req: Request, res: Response): Promise<any> {
        const recipientId: number = Number(res.locals.jwtPayload.id)
        const cartId: number = req.body
        try {
            const orderRepository = AppDataSource.getRepository(Order)
            const petsRepository = AppDataSource.getRepository(Pets)
            const cartRepository = AppDataSource.getRepository(ShoppingCart)
            const order = new Order()
            const Orders = new OrderController()
            order.pets = []
            let pet: Pets | any = await petsRepository.findOne({
                where: { id: cartId },
            })
            const transactionCode: number | any =
                await Orders.RandomTransactionCode(6)
            await console.log(transactionCode)
            order.user = new Users()
            await petsRepository
                .createQueryBuilder()
                .update(Pets)
                .set({ itemStatus: 2 })
                .where('id = :id', { id: cartId })
                .execute()
            order.user.id = recipientId
            order.order_status = 'Pending'
            order.transactionCode = transactionCode
            order.pets.unshift(pet)
            await orderRepository.save(order)
            const deleted = await cartRepository.delete({ productId: cartId })
            if (deleted) return res.status(200).json(order)
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
            return
        }
    }

    async GetPetsForUserOrder(
        req: Request,
        res: Response
    ): Promise<Pets[] | any> {
        const userId = Number(res.locals.jwtPayload.id)
        try {
            const orderRepository = AppDataSource.getRepository(Order)
            const order: any = await orderRepository.find({
                relations: {
                    pets: true,
                },
                where: {
                    user: {
                        id: userId,
                    },
                },
            })

            const petInOrder = order.map((element: any) => {
                return element.pets
            })

            return res.status(200).json(petInOrder)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }

    async UpdateStatusOrder(req: Request, res: Response): Promise<any> {
        const data = req.body
        const userId = Number(res.locals.jwtPayload.id)
        try {
            const orderRepository = AppDataSource.getRepository(Order)
            const order = await orderRepository.findOne(data.id)
            let updateStatus
            if (order) {
                updateStatus = await orderRepository.update(order.id, {
                    order_status: data.status,
                })
            }
            if (!updateStatus) {
                return new HttpException('Update failed', 403).ResponseError(
                    res
                )
            } else {
                return res.status(201).json('Update successful')
            }
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    }

    private RandomTransactionCode = async (number: number): Promise<number> => {
        const characters = '0123456789'
        let transactionCode = ''
        for (let i = 0; i < number; i++) {
            transactionCode += characters.charAt(
                Math.floor(Math.random() * characters.length)
            )
        }
        return Number(transactionCode)
    }

    async GetAllOrders(req: Request, res: Response): Promise<any> {
        try {
            const orderRepository = AppDataSource.getRepository(Order)
            const orders = await orderRepository.find()
            if (orders) {
                return res.status(200).json(orders)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
}
