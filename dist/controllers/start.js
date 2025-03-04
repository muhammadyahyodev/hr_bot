"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaqById = exports.sendNotifToAdminOfMessage = exports.startController = void 0;
const grammy_1 = require("grammy");
const data_source_1 = require("../database/data-source");
const faq_entity_1 = require("../entities/faq.entity");
const enums_1 = require("../utils/enums");
const constants_1 = require("../utils/constants");
const bot_1 = require("../core/bot");
const logger_1 = require("../utils/logger");
const faqRepository = data_source_1.AppDataSource.getRepository(faq_entity_1.Faq);
const startController = async (ctx) => {
    try {
        const faqEntities = await faqRepository.find({
            where: {
                status: enums_1.QuestionStatus.OPEN
            }
        });
        let message = faqEntities.map((faq, index) => `${index + 1}. ${faq.question}`).join("\n");
        const keyboard = new grammy_1.Keyboard(faqEntities.map((faq) => [`${faq.id}`]))
            .resized()
            .oneTime();
        await ctx.reply(constants_1.INTRODUCTION_MESSAGE);
        await ctx.reply(message, { reply_markup: keyboard });
    }
    catch (error) {
        (0, logger_1.logger)("Error: startController", "error");
    }
};
exports.startController = startController;
const getFaqById = async (ctx) => {
    try {
        const id = Number(ctx.message?.text);
        const faq = await faqRepository.findOne({ where: { id } });
        const faqEntities = await faqRepository.find({
            where: {
                status: enums_1.QuestionStatus.OPEN
            }
        });
        if (faqEntities.length === 0) {
            ctx.reply(`Ko'rsatilgan raqamlardan foydalaning!`);
        }
        const keyboard = new grammy_1.Keyboard(faqEntities.map((faq) => [`${faq.id}`]))
            .resized()
            .oneTime();
        const responseFormat = `${faq?.question}?\n\n<b>${faq?.answer}</b>`;
        ctx.reply(responseFormat, { parse_mode: "HTML", reply_markup: keyboard });
    }
    catch (error) {
        (0, logger_1.logger)("Error: getById", "error");
    }
};
exports.getFaqById = getFaqById;
const sendNotifToAdminOfMessage = async (ctx) => {
    try {
        const question = ctx.message?.text?.trim();
        const requestFormat = `Sizga ${ctx.message?.from.username ? "@" + ctx.message?.from.username : ctx.message?.from.first_name}'dan savol bor:\n\n<b>${question}</b>`;
        bot_1.bot.api.sendMessage(Number(process.env.BOT_ADMIN_ID), requestFormat, { parse_mode: "HTML" });
        ctx.reply('Tez orada javob berishga harakat qilamiz!');
    }
    catch (error) {
        (0, logger_1.logger)("Error: sendNotificationMessage", "error");
    }
};
exports.sendNotifToAdminOfMessage = sendNotifToAdminOfMessage;
