"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const bot_1 = require("../core/bot");
const state_1 = require("../utils/state");
bot_1.bot.on("message", async (ctx, next) => {
    const userId = ctx.from.id;
    const text = ctx.message?.text?.trim();
    if (/^\d+$/.test(text)) {
        next();
    }
    if ((0, state_1.isUserInQuestionMode)(userId)) {
        // remove user giving question state from set
        (0, state_1.removeUserFromQuestionMode)(userId);
        await (0, controllers_1.sendNotifToAdminOfMessage)(ctx);
    }
    else {
        await ctx.reply("Savol berish uchun avval /savol deb yozing.");
    }
});
bot_1.bot.hears(/^\d+$/, controllers_1.getFaqById);
