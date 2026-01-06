import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { ExtendedClient } from "..";
import type { Guild } from "discord.js";

export class Loader {
  constructor(private client: ExtendedClient) { }

  public async slashCommands(path: string) {
    try {
      const entries = readdirSync(path);

      for (const entry of entries) {
        const files = readdirSync(join(path, entry)).filter(file =>
          file.endsWith(".ts") || file.endsWith(".js")
        );

        for (const file of files) {
          const command = (await import(join(path, entry, file))).default;

          if (!command?.name) continue;

          this.client.slashCommands.set(command.name, command);
        }
      }

      if (this.client.slashCommands.size === 0) return;

      this.client.on("clientReady", async () => {
        for (const guild of this.client.guilds.cache.values()) {
          await guild.commands.set([...this.client.slashCommands.values()]).catch(() => null);
        }
      });

      this.client.on("guildCreate", async (guild: Guild) => {
        await guild.commands.set([...this.client.slashCommands.values()]).catch(() => null);
      });
    } catch (error: any) {
      throw new Error(error.message || error);
    }
  }

  public async events(path: string) {
    try {
      const entries = readdirSync(path);

      for (const entry of entries) {
        const files = readdirSync(join(path, entry)).filter(file =>
          file.endsWith(".ts") || file.endsWith(".js")
        );

        for (const file of files) {
          const event = (await import(join(path, entry, file))).default;

          if (!event?.name) continue;

          if (!event?.once) {
            this.client.on(event.name, (...args) => event.run(this.client, ...args));
          } else {
            this.client.once(event.name, (...args) => event.run(this.client, ...args));
          }
        }
      }
    } catch (error: any) {
      throw new Error(error.message || error);
    }
  }
}