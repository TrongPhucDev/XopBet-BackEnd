import { ShoppingCart } from './../../entity/cart.entity'
import { Request, response, Response } from 'express'
import { Users } from '../../entity/users.entity'
import { AppDataSource } from '../../utils/data-source'
import bcrypt from 'bcrypt'
import { Pets } from '../../entity/pets.entity'
import HttpException from '../../utils/HttpException'

export class UsersController {
    static GetMe = async (
        req: Request,
        res: Response
    ): Promise<Users | any> => {
        try {
            const userId = Number(res.locals.jwtPayload.id)
            console.log(userId)
            const userRepository = AppDataSource.getRepository(Users)
            let user: Users | any = await userRepository.findOne({
                where: { id: userId },
            })
            if (userId === user!.id) {
                return res.status(200).json(user)
            }
        } catch (error) {
            res.status(500).send(error)
            return
        }
    }

    static GetCurrentUserId = async (res: Response): Promise<Users['id']> => {
        const userId: number = Number(res.locals.jwtPayload.id)
        if (!userId) res.status(401).json('User id is required, Please Login!')
        return userId
    }

    static GetAllPetPost = async (
        req: Request,
        res: Response
    ): Promise<Users | any> => {
        try {
            const userId: number = Number(res.locals.jwtPayload.id)
            const postId: number = Number(req.params.id)
            const usersRepository = AppDataSource.getRepository(Users)
            const user = await usersRepository.find({
                where: { id: userId },
                relations: ['pets'],
            })
            const allPostInUser = user[0].pets
            res.status(200).json(allPostInUser)
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    }
    static GetAllUserAdmin = async (
        req: Request,
        res: Response
    ): Promise<Users[] | any> => {
        try {
            const usersRepository = AppDataSource.getRepository(Users)
            const AllUser: Users[] = await usersRepository.find()
            if (!AllUser) {
                res.status(404)
                throw new Error('Something went wrong')
            }
            return res.status(200).json(AllUser)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static UpdateUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const userId = Number(res.locals.jwtPayload.id)
            const data: Users = req.body
            const usersRepository = AppDataSource.getRepository(Users)
            const user = await usersRepository.findOne({
                where: { id: userId },
            })
            if (data.password) {
                const hashed = await bcrypt.hash(data.password, 8)
                data.password = hashed
                const PasswordUpdated = await usersRepository.update(user!.id, {
                    ...data,
                })
                if (PasswordUpdated) {
                    return res.status(200).json('Update password successful')
                } else {
                    res.status(402)
                    throw new Error('Update user failed')
                }
            } else {
                const updated = await usersRepository.update(user!.id, {
                    ...data,
                })
                if (updated) {
                    return res.status(200).json('Update user successfully')
                }
            }
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    }

    static AdminDeleteUser = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const listId = req.body.userId
        try {
            const usersRepository = AppDataSource.getRepository(Users)
            const cartRepository = AppDataSource.getRepository(ShoppingCart)
            const petsRepository = AppDataSource.getRepository(Pets)
            let deletedUsers
            for (const userId of listId) {
                let entity: any = [{ id: userId }]
                let entities: any = [{ userId: userId }]
                let petEntity: any = [{ userId: userId }]
                const cart = await cartRepository.find({
                    where: { userId: userId },
                })
                const pet = await petsRepository.find({
                    where: { userId: userId },
                })
                if (cart || pet) {
                    await cartRepository.delete(entities)
                    await petsRepository.delete(petEntity)
                    deletedUsers = await usersRepository.delete(entity)
                } else {
                    deletedUsers = await usersRepository.delete(entity)
                }
            }
            if (deletedUsers) {
                res.status(201).json('Delete users successfully')
            } else {
                new HttpException('Delete user failed', 401).ResponseError(res)
            }
        } catch (error) {
            res.status(500).json({ error: error })
            console.log(error)
        }
    }
}
