import { IntentsBitField, Client, Collection } from "discord.js";
const intents = new IntentsBitField(3276799);
const bot = new Client({ intents });
import { token } from "./config.js";
import loadCommands from "./Loaders/loadCommands.js";
import loadEvents from "./Loaders/loadEvents.js";

bot.commands = new Collection();

bot.login(token);
loadCommands(bot);
loadEvents(bot);