"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot(process.env.BOT_TOKEN);
exports.bot = bot;
