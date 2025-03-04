"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../database/data-source");
const logger_1 = require("../utils/logger");
const bot_1 = require("./bot");
data_source_1.AppDataSource
    .initialize()
    .then(() => {
    (0, logger_1.logger)('Data Source has been initialized', "info");
})
    .catch((err) => {
    (0, logger_1.logger)(err, "error");
});
bot_1.bot.start();
(0, logger_1.logger)("Bot has been started", "info");
