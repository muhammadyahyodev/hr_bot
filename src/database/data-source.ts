import "reflect-metadata";
import { DataSource } from "typeorm"
import { join } from 'path';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'my2002',
    database: 'test',
    entities: [join(__dirname, "/../**/*.entity{.ts,.js}")],
    migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
    synchronize: false,
    logging: true,
});