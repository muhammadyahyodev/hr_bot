import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm"
import { join } from 'path';

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_CONNECTION_URL,
    entities: [join(__dirname, "/../entities/*.entity{.ts,.js}")],
    migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
    synchronize: false,
    logging: true,
} as DataSourceOptions);

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
