import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Pets } from './pets.entity'
import { Users } from './users.entity'

@Entity({ name: 'cart' })
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    productId: number

    @ManyToOne(() => Pets, (pet) => pet.carts)
    pet: Pets

    @ManyToOne(() => Users, (user) => user.cart)
    user: Users
}
