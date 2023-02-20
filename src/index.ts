import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import { AppDataSource } from './utils/data-source'
import usersRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'
import petsRoutes from './routes/pets.routes'
import cartRoutes from './routes/cart.routes'
import orderRoutes from './routes/order.routes'
import config from 'config'
AppDataSource.initialize()
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use(bodyParser.json())
        app.use(express.json({ limit: '150mb' }))
        app.use(express.urlencoded({ limit: '150mb', extended: true }))
        app.use(cors({ origin: true }))
        app.use(express.static('public/images'))
        app.use(cookieParser())
        app.use('/api/users', usersRoutes)
        app.use('/api/auth', authRoutes)
        app.use('/api/pets', petsRoutes)
        app.use('/api/cart', cartRoutes)
        app.use('/api/order', orderRoutes)
        const Port: number | string = config.get<number>('PORT') || 5000
        app.listen(Port, () =>
            console.log(`Server id running on port ${5000}`)
        )
    })
    .catch((err) => console.log(err))
