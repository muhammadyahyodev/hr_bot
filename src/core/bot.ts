import { Bot } from "grammy";
import dotenv from 'dotenv';
dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN as string); 

export { bot }; 