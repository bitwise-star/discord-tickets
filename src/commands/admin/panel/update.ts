import { Discord, Guard, Slash, SlashGroup, SlashOption } from "discordx";
import { hasPermission } from "../../../lib/guard/has-permission.js";
import { ApplicationCommandOptionType, type CommandInteraction } from "discord.js";
import { TicketPanelService } from "../../../services/ticket-panel.js";
import { isGuildRegistered } from "../../../lib/guard/is-guild-registered.js";

@Discord()
@SlashGroup("panel")
class Command {
    @Slash({ name: "update", description: "Update any ticket panel data." })
    @Guard(hasPermission("Administrator"), isGuildRegistered)
    async exec(
        @SlashOption({
            name: "id",
            description: "ID of the panel to delete.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            minValue: 0
        }) id: number,
        @SlashOption({
            name: "name",
            description: "Your ticket panel new name.",
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

        if (!await ticketPanelService.existsInGuildById(id, guildId))
            return await interaction.followUp({
                content: "❌ Cannot find any panel with the specified ID.",
                ephemeral: true
            });

        const result = await ticketPanelService.updateName(id, name);

        await interaction.followUp({
            content: `✅ Panel name updated to \`${result.name}\`!`,
            ephemeral: true
        });
    }
}