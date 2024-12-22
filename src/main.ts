import { dirname, importx } from "@discordx/importer";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import { Logger } from "./lib/logger.js";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    errorFormat: "pretty"
});

export const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
  silent: false,
  simpleCommand: {
    prefix: "!",
  },
});

await prisma.$connect()
  .then(() => Logger.info("Connect to database."))
  .catch(err => Logger.error(err));

async function run() {
  await importx(`${dirname(import.meta.url)}/{events,commands,components}/**/*.{ts,js}`);

  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  await bot.login(process.env.BOT_TOKEN);
}

void run();