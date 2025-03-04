"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino = require('pino')({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "SYS:HH:MM:ss.l",
            ignore: "pid,hostname",
        },
    },
});
const logger = (context, status) => {
    switch (status) {
        case "info": pino.info(context);
        case "warn": pino.warn(context);
        case "error": pino.error(context);
        case "debug": pino.debug(context);
    }
};
exports.logger = logger;
