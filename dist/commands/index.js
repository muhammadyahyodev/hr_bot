"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const bot_1 = require("../core/bot");
const state_1 = require("../utils/state");
bot_1.bot.command('start', controllers_1.startController);
bot_1.bot.command('savol', async (ctx) => {
    (0, state_1.addUserToQuestionMode)(ctx.message?.from.id);
    await ctx.reply("Savolingizni yozing.");
});
