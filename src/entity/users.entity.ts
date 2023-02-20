import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm'
import { Pets } from './pets.entity'
import bcrypt from 'bcrypt'
import { ShoppingCart } from './cart.entity'
import { Order } from './order.entity'
// import { ShoppingCart } from './cart.entity'

@Entity({ name: 'users' })
@Unique(['email'])
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    numberPhone: string

    @Column()
    address: string

    @Column({ default: 1 })
    role: number

    @Column()
    sex: string

    @Column()
    avatar: string

    @Column()
    cartId: number

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Pets, (pets) => pets.user)
    pets: Pets[]

    @OneToMany(() => ShoppingCart, (cart) => cart.user, {
        nullable: true,
        cascade: true,
    })
    cart: ShoppingCart[]

    @OneToMany((type) => Order, (orders) => orders.user)
    orders: Order[]

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
