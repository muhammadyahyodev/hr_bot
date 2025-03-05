import { addFaqToList, getFaqById, sendNotifToAdminOfMessage } from "../controllers";
import { isAdminMode, isUserInQuestionMode, removeUserFromQuestionMode } from "../utils/state";
import { bot } from "../core/bot";

bot.on("message", async (ctx, next) => {
    const userId = ctx.from.id;
    const text = ctx.message?.text?.trim() as string;

    if (!text) {
        await ctx.reply(`Ma'lumotni to'g'ri shaklda yuboring!`);
        return;
    }

    // Agar faqat raqam bo'lsa va user question mode'da bo'lmasa, `getFaqById` ishlashi uchun return qilamiz
    if (/^\d+$/.test(text) && !isUserInQuestionMode(userId) && !isAdminMode()) {
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
    if (isAdminMode()) {
        return next();
    }

    // Agar hech qaysi shartga tushmasa, userga noto‘g‘ri xabar yuborilganini bildiramiz
    await ctx.reply(
        `Savol berish uchun /savol foydalaning\n\nSavollar ro'yxatini ko'rish uchun qaytadan /start bosing`
    );
});

bot.hears(/^\d+$/, (ctx, next) => {
    if (isAdminMode()) {
        return next()
    }

    getFaqById(ctx);
});

bot.on("message", async (ctx) => {
    const userId = ctx.message?.from.id
    const isAdmin = String(userId) === process.env.BOT_ADMIN_ID
    
    if (isAdminMode() && isAdmin) {
        await addFaqToList(ctx);
    } else {
        await ctx.reply('Admin mode yoqilmagan!') 
    }
    
});
