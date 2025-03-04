const pino = require('pino')({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "SYS:HH:MM:ss.l",
            ignore: "pid,hostname",
        },
    },
})

export const logger = (context: string, status: string) => {
    switch (status) {
        case "info": pino.info(context);
        case "warn": pino.warn(context);
        case "error": pino.error(context);
        case "debug": pino.debug(context);
    }
}