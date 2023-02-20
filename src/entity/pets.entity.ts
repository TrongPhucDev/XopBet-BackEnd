import { IsNotEmpty } from 'class-validator'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { ShoppingCart } from './cart.entity'
import { Order } from './order.entity'
// import { ShoppingCart } from './cart.entity'
import { Users } from './users.entity'

@Entity({ name: 'pets' })
export class Pets {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    categoryId: number

    @Column()
    @IsNotEmpty()
    title: string

    @Column()
    @IsNotEmpty()
    description: string

    @Column()
    assess: number

    @Column()
    @IsNotEmpty()
    price: number

    @Column()
    @IsNotEmpty()
    species: string

    @Column('text')
    image: string

    @Column({ default: 1 })
    itemStatus: number

    @Column()
    poster: string

    @Column()
    posterPhoneNumber: number

    @Column({ default: 1 })
    number: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Users, (user) => user.pets, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: Users

    @ManyToMany(() => Order)
    @JoinTable()
    orders: Order[]

    @OneToMany(() => ShoppingCart, (carts) => carts.pet)
    carts: ShoppingCart[]
}
