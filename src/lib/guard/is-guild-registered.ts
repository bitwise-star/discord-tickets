import type { CommandInteraction } from "discord.js";
import type { GuardFunction } from "discordx";
import { GuildConfigService } from "../../services/guild-config.js";

export const isGuildRegistered: GuardFunction<CommandInteraction> = async (
    interaction,
    _,
    next
) => {
    const guildId = interaction.guildId;
    if (!guildId) return;

    const guildConfigService = new GuildConfigService();
    const guildExists = await guildConfigService.existsById(guildId);

    if (!guildExists)
        await guildConfigService.create(guildId);

    await next();
}