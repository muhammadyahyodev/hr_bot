import { AppDataSource } from '../database/data-source';
import { bot } from './bot';

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

bot.start();