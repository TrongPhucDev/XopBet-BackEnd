import { Request, Response } from 'express'
import { AuthRegister, AuthLogin } from './auth.dto'
import { Users } from '../../entity/users.entity'
import { AppDataSource } from '../../utils/data-source'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
import { SendMail } from '../mailer/sendMail.controller'
import HttpException from '../../utils/HttpException'
export class AuthController {
    async Register(req: Request, res: Response): Promise<AuthRegister | any> {
        const data: AuthRegister = req.body
        try {
            const auth: AuthController = new AuthController()
            const usersRepository = AppDataSource.getRepository(Users)
            const user: any = await auth.validateUser(data.email, data.username)
            if (user) {
                return new HttpException('User not found', 404)
            } else {
                const hashed: string = bcrypt.hashSync(data.password, 8)
                const newUser = await usersRepository.save({
                    ...data,
                    password: hashed,
                })
                return res.status(200).json(newUser.email)
            }
        } catch (error) {
            res.status(500).send(error)
            return
        }
    }

    async Login(req: Request, res: Response): Promise<Users | any> {
        const data: AuthLogin = req.body
        try {
            const auth: AuthController = new AuthController()
            const user: Users | any = await auth.validateUser(
                data.email,
                data.username
            )
            let isCorrectPassword: boolean =
                user.checkIfUnencryptedPasswordIsValid(data.password)
            if (!user || !isCorrectPassword) {
                return new HttpException(
                    'User or password incorrect',
                    403
                ).ResponseError(res)
            }
            const AccessToken: string = jwt.sign(
                {
                    id: user!.id,
                    email: user!.email,
                    username: user!.username,
                    role: user!.role,
                },
                config.get<string>('JWT_KEY')
            )
            return res
                .cookie('access_token', AccessToken, {
                    httpOnly: true,
                })
                .status(200)
                .json({
                    id: user!.id,
                    username: user!.username,
                    email: user!.email,
                    role: user!.role,
                    AccessToken,
                })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async Logout(req: Request, res: Response) {
        res.clearCookie('access_token').status(200).json('Logout success')
    }

    private validateUser = async (
        email: string,
        username: string
    ): Promise<Users | null> => {
        const usersRepository = AppDataSource.getRepository(Users)
        const user = await usersRepository.findOne({
            where: [{ email }, { username }],
        })
        return user
    }

    async ForgotPassword(req: Request, res: Response): Promise<any> {
        const email = req.body.email
        try {
            const sendMail = new SendMail()
            const usersRepository = AppDataSource.getRepository(Users)
            let user = await usersRepository.findOne({
                where: { email: email },
            })
            if (user) {
                let randomNewPasword: string = ''
                const characters =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                const charactersLength = characters.length
                for (var i = 0; i <= 6; i++) {
                    randomNewPasword += characters.charAt(
                        Math.floor(Math.random() * charactersLength)
                    )
                }
                const hashed: string = await bcrypt.hash(randomNewPasword, 8)
                console.log(hashed)
                const updated = await usersRepository.update(user!.id, {
                    password: hashed,
                })
                if (updated) {
                    await sendMail.SendMailForgotPassword({
                        email,
                        randomNewPasword,
                    })
                    return res.status(200).json('Send Email Success!')
                }
            }
        } catch (error) {
            res.status(500).send(error)
            return
        }
    }
}
