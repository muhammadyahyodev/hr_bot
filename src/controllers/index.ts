import { Context, Keyboard } from "grammy";
import { AppDataSource } from "../database/data-source";
import { Faq } from "../entities/faq.entity";
import { QuestionStatus } from "../utils/enums";
import { INTRODUCTION_MESSAGE } from "../utils/constants";
import { bot } from "../core/bot";
import { logger } from "../utils/logger";

const faqRepository = AppDataSource.getRepository(Faq)

const startController = async (ctx: Context) => {
    try {

        const faqEntities = await faqRepository.find({
            where: {
                status: QuestionStatus.OPEN
            }
        });

        let message = faqEntities.map((faq, index) => `${index + 1}. ${faq.question}`).join("\n");

        const keyboard = new Keyboard(
          faqEntities.map((faq) => [`${faq.id}`])
        )
          .resized() 
          .oneTime();
      
        await ctx.reply(INTRODUCTION_MESSAGE);
        await ctx.reply(message, { reply_markup: keyboard });

    } catch (error) {

        logger("Error: startController", "error")
    
    }
}

const getFaqById = async (ctx: Context) => {
    try {
        const id = Number(ctx.message?.text)
        const faq = await faqRepository.findOne({ where: { id }});

        const faqEntities = await faqRepository.find({
            where: {
                status: QuestionStatus.OPEN
            }
        });

        if (faqEntities.length === 0) {
            ctx.reply(`Ko'rsatilgan raqamlardan foydalaning!`)
        }

        const keyboard = new Keyboard(
        faqEntities.map((faq) => [`${faq.id}`])
        )
        .resized() 
        .oneTime();

        const responseFormat = `${faq?.question}?\n\n<b>${faq?.answer}</b>`

        ctx.reply(responseFormat, {parse_mode: "HTML", reply_markup: keyboard })
    } catch (error) {
        
        logger("Error: getById", "error")

    }
}

const sendNotifToAdminOfMessage = async (ctx: Context) => {
    try {
        
        const question = ctx.message?.text?.trim();

        const requestFormat = `Sizga ${ctx.message?.from.username ? "@" + ctx.message?.from.username : ctx.message?.from.first_name}'dan savol bor:\n\n<b>${question}</b>`

        bot.api.sendMessage(Number(process.env.BOT_ADMIN_ID), requestFormat, {parse_mode: "HTML"})

        ctx.reply('Tez orada javob berishga harakat qilamiz!')

    } catch (error) {

        logger("Error: sendNotificationMessage", "error")
    
    }
}

export { startController, sendNotifToAdminOfMessage, getFaqById }