import { ApplicationCommandOptionType, type CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashGroup, SlashOption } from "discordx";
import { hasPermission } from "../../../lib/guard/has-permission.js";
import { TicketPanelService } from "../../../services/ticket-panel.js";
import { isGuildRegistered } from "../../../lib/guard/is-guild-registered.js";

@Discord()
@SlashGroup({ name: "panel", description: "Panel commands category." })
@SlashGroup("panel")
class Command {
    @Slash({ name: "create", description: "Create a new ticket panel." })
    @Guard(hasPermission("Administrator"), isGuildRegistered)
    async exec(
        @SlashOption({
            name: "name",
            description: "Your ticket panel name.",
            type: ApplicationCommandOptionType.String,
            required: true,
            minLength: 1,
            maxLength: 20
        }) name: string,
        interaction: CommandInteraction
    ) {
        await interaction.deferReply({ ephemeral: true });

        const guildId = interaction.guildId as string;
        const ticketPanelService = new TicketPanelService();

        const newPanelData = await ticketPanelService.create(name, guildId);

        return await interaction.followUp({
            content: `✅ Panel created with success!\n- \`Name: ${newPanelData.name}\`\n- \`ID: ${newPanelData.id}\``,
            ephemeral: true
        });
    }
}