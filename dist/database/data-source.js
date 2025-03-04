"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'my2002',
    database: 'test',
    entities: [(0, path_1.join)(__dirname, "/../**/*.entity{.ts,.js}")],
    migrations: [(0, path_1.join)(__dirname, '/migrations/**/*{.ts,.js}')],
    synchronize: false,
    logging: false,
});
