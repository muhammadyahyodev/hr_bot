import { AppDataSource } from '../database/data-source';
import { logger } from '../utils/logger';
import { bot } from './bot';

AppDataSource
    .initialize()
    .then(() => {
        logger('Data Source has been initialized', "info")
    })
    .catch((err) => {
        logger(err, "error")
    })

bot.start();
logger("Bot has been started", "info")