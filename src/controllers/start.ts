import { Context } from "grammy";

const startController = (ctx: Context) => {
    try {

        const introductionMessage = `Assalomu alaykum! Bot orqali siz savollaringizga javob olishingiz mumkin!`

        ctx.reply(introductionMessage);

    } catch (error) {
        console.log(error)
    }
}

export { startController }