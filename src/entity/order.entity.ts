import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Pets } from './pets.entity'
import { Users } from './users.entity'

@Entity({ name: 'order' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    transactionCode: number

    @Column()
    order_status: string

    @ManyToOne((type) => Users, (user) => user.orders)
    user: Users

    @ManyToMany(() => Pets)
    @JoinTable()
    pets: Pets[]

    @Column()
    total: number
}
