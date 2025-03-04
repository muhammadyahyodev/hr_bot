import { getFaqById, sendNotifToAdminOfMessage } from "../controllers";
import { bot } from "../core/bot";
import { isUserInQuestionMode, removeUserFromQuestionMode } from "../utils/state";

bot.on("message", async (ctx, next) => {
    const userId = ctx.from.id;
    const text = ctx.message?.text?.trim() as string;

    if (/^\d+$/.test(text)) {
        next()
        return;
    }

    if (isUserInQuestionMode(userId)) {
        // remove user giving question state from set
        removeUserFromQuestionMode(userId);

        await sendNotifToAdminOfMessage(ctx); 
    } else {
    
        await ctx.reply(`Savol berish uchun /savol foydalaning\n\nSavollar ro'yxatini ko'rish uchun qaytadan /start bosing`); 
    
    }
});
bot.hears(/^\d+$/, getFaqById);