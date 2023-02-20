import { DataSource } from 'typeorm'
export const AppDataSource = new DataSource({
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'xopbet',
    synchronize: true,
    logging: true,
    entities: ['src/**/*.entity.ts'],
})
