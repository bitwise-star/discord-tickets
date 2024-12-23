import { Discord, Guard, Slash, SlashGroup, SlashOption } from "discordx";
import { hasPermission } from "../../../lib/guard/has-permission.js";
import { ApplicationCommandOptionType, Colors, EmbedBuilder, type CommandInteraction } from "discord.js";
import { TicketPanelService } from "../../../services/ticket-panel.js";
import { isGuildRegistered } from "../../../lib/guard/is-guild-registered.js";

@Discord()
@SlashGroup("panel")
class Command {
    @Slash({ name: "list", description: "List all existent ticket panels." })
    @Guard(hasPermission("Administrator"), isGuildRegistered)
    async exec(interaction: CommandInteraction) {
        await interaction.deferReply({ ephemeral: true });

        const guildId = interaction.guildId as string;
        const ticketPanelService = new TicketPanelService();

        const embed = new EmbedBuilder()
            .setTitle("📝 • Registered panels")
            .setColor("#ff99e0")
            .setTimestamp(Date.now());

        let description = "";
        const panels = await ticketPanelService.getAllByGuildId(guildId);

        for (const panel of panels) {
            description += `\`ID: ${panel.id}\` - ${panel.name}`;
        }

        embed.setDescription(description || "No panels found.");

        await interaction.followUp({
            embeds: [embed],
            ephemeral: true
        });
    }
}