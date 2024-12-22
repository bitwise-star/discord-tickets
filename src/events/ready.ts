import type { User } from "discord.js";
import { type ArgsOf, type Client, Discord, Once } from "discordx";
import { Logger } from "../lib/logger.js";

@Discord()
export class Event {
    @Once({ event: "ready" })
    async exec([_]: ArgsOf<"ready">, client: Client) {
        const { displayName, id } = client.user as User;

        void client.initApplicationCommands();
        Logger.info(`Bot is ready! ${displayName}(${id})`);
    }
}