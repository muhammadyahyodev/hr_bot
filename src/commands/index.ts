import { startController } from "../controllers";
import { bot } from "../core/bot";
import { addUserToQuestionMode } from "../utils/state";


bot.command('start', startController);
bot.command('savol', async (ctx) => {
    addUserToQuestionMode(ctx.message?.from.id as number);
    await ctx.reply("Savolingizni yozing.");
})