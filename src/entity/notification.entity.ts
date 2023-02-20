import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'notification' })
export class Notification {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    message: string

    @Column()
    recipient: string

    @Column()
    status: 'sent' | 'failed'
}
