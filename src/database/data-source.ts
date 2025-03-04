import "reflect-metadata";
import { DataSource } from "typeorm"
import { join } from 'path';

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_CONNECTION_URL,
    entities: [join(__dirname, "/../**/*.entity{.ts,.js}")],
    migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
    synchronize: false,
    logging: false,
});