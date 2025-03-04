import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN as string); 

export { bot }; 