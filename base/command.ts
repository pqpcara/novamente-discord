import type { AutocompleteInteraction, ChatInputCommandInteraction, Client, CommandInteraction } from "discord.js";
import type { ExtendedClient } from "..";

export interface SlashCommand {
  name: string;
  description: string;
  type: number;
  options?: {
    name: string;
    description: string;
    type: number;
    required?: boolean;
    choices?: {
      name: string;
      value: string | number;
    }[];
  }[];

  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  run: (client: Client | ExtendedClient, interaction: ChatInputCommandInteraction | CommandInteraction) => Promise<void>;
}

export function createCommand(command: SlashCommand): SlashCommand {
  return command;
}