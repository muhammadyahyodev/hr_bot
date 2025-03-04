import { getFaqById, sendNotifToAdminOfMessage } from "../controllers";
import { bot } from "../core/bot";
import { isUserInQuestionMode, removeUserFromQuestionMode } from "../utils/state";

bot.on("message", async (ctx, next) => {
    const userId = ctx.from.id;
    const text = ctx.message?.text?.trim() as string;

    if (/^\d+$/.test(text)) {
        next()
    }

    if (isUserInQuestionMode(userId)) {
        // remove user giving question state from set
        removeUserFromQuestionMode(userId);

        await sendNotifToAdminOfMessage(ctx); 
    } else {
        await ctx.reply("Savol berish uchun avval /savol deb yozing.");
    }
});
bot.hears(/^\d+$/, getFaqById);