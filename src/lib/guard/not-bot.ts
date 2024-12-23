import { ButtonInteraction, ChannelSelectMenuInteraction, CommandInteraction, ContextMenuCommandInteraction, MentionableSelectMenuInteraction, ModalSubmitInteraction, RoleSelectMenuInteraction, StringSelectMenuInteraction, UserSelectMenuInteraction, MessageReaction, VoiceState, Message } from "discord.js";
import { type GuardFunction, type ArgsOf, SimpleCommandMessage } from "discordx";

export const NotBot: GuardFunction<
  | ArgsOf<"messageCreate" | "messageReactionAdd" | "voiceStateUpdate">
  | ButtonInteraction
  | ChannelSelectMenuInteraction
  | CommandInteraction
  | ContextMenuCommandInteraction
  | MentionableSelectMenuInteraction
  | ModalSubmitInteraction
  | RoleSelectMenuInteraction
  | StringSelectMenuInteraction
  | UserSelectMenuInteraction
  | SimpleCommandMessage
> = async (arg, client, next, guardData) => {
  const argObj = Array.isArray(arg) ? arg[0] : arg;
  const user =
    argObj instanceof CommandInteraction
      ? argObj.user
      : argObj instanceof MessageReaction
        ? argObj.message.author
        : argObj instanceof VoiceState
          ? argObj.member?.user
          : argObj instanceof Message
            ? argObj.author
            : argObj instanceof SimpleCommandMessage
              ? argObj.message.author
              : argObj instanceof ButtonInteraction ||
                  argObj instanceof ChannelSelectMenuInteraction ||
                  argObj instanceof CommandInteraction ||
                  argObj instanceof ContextMenuCommandInteraction ||
                  argObj instanceof MentionableSelectMenuInteraction ||
                  argObj instanceof ModalSubmitInteraction ||
                  argObj instanceof RoleSelectMenuInteraction ||
                  argObj instanceof StringSelectMenuInteraction ||
                  argObj instanceof UserSelectMenuInteraction
                ? argObj.member?.user
                : argObj.message.author;

  if (!user?.bot)
    await next();
};