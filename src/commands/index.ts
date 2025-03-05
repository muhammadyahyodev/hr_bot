import { startController } from "../controllers";
import { bot } from "../core/bot";
import { addUserToQuestionMode, setAdminMode } from "../utils/state";


bot.command('start', startController);
bot.command('savol', async (ctx) => {
    addUserToQuestionMode(ctx.message?.from.id as number);
    await ctx.reply("Savolingizni yozing.");
})
bot.command('admin',  async (ctx) => {
    const userId = ctx.message?.from.id

    if (Number(userId) !== Number(process.env.BOT_ADMIN_ID)) {
        ctx.reply('Ruxsat etilmagan!')
        return;
    }

    setAdminMode(true);
    await ctx.reply("Savol va javobni qo'shishingiz mumkin!");
})