import { addFaqToList, getFaqById, sendNotifToAdminOfMessage } from "../controllers";
import { isUserInQuestionMode, removeUserFromQuestionMode } from "../utils/state";
import { bot } from "../core/bot";

bot.on("message", async (ctx, next) => {
    const userId = ctx.from.id;
    const text = ctx.message?.text?.trim() as string;

    if (!text) {
        await ctx.reply(`Ma'lumotni to'g'ri shaklda yuboring!`);
        return;
    }

    // Agar faqat raqam bo'lsa va user question mode'da bo'lmasa, `getFaqById` ishlashi uchun return qilamiz
    if (/^\d+$/.test(text) && !isUserInQuestionMode(userId)) {
        return next(); // `bot.hears(/^\d+$/, getFaqById)` ga o'tadi
    }

    // User savol kiritayotgan paytda faqat raqam yozishining oldini olamiz
    if (/^\d+$/.test(text) && isUserInQuestionMode(userId)) {
        await ctx.reply(`Ma'lumotni to'g'ri shaklda kiriting!`);
        return;
    }

    // Agar user question mode'da bo'lsa, savol qabul qilinadi va adminga yuboriladi
    if (isUserInQuestionMode(userId)) {
        removeUserFromQuestionMode(userId);
        await sendNotifToAdminOfMessage(ctx);
        return;
    }

    // Agar admin FAQ qo'shayotgan bo'lsa, `next()` orqali keyingi handlerga o'tamiz
    if (text.startsWith('admin:')) {
        return next();
    }

    // Agar hech qaysi shartga tushmasa, userga noto‘g‘ri xabar yuborilganini bildiramiz
    await ctx.reply(
        `Savol berish uchun /savol foydalaning\n\nSavollar ro'yxatini ko'rish uchun qaytadan /start bosing`
    );
});

bot.hears(/^\d+$/, getFaqById);

bot.on("message", async (ctx, next) => {
    const userId = ctx.message?.from.id

    if (Number(userId) !== Number(process.env.BOT_ADMIN_ID)) {
        ctx.reply('Ruxsat etilmagan!')
        return;
    }

    const text = ctx.message?.text?.trim() as string;

    if (!text) {
        await ctx.reply(`Ma'lumotni to'g'ri shaklda yuboring!`);
        return;
    }

    if (text.startsWith("admin:")) {
        await addFaqToList(ctx);
        return;
    }

    return next();
});
