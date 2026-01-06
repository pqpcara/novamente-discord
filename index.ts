import "dotenv/config";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import type { SlashCommand } from "./base/command";
import { Loader } from "./handlers/loader";

export interface ExtendedClient extends Client {
  slashCommands: Collection<string, SlashCommand>;
}

const client = new Client({
  intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
  partials: Object.values(Partials) as Partials[]
}) as ExtendedClient;

export default client;

client.slashCommands = new Collection<string, SlashCommand>();

const loader = new Loader(client);

await loader.slashCommands(`${process.cwd()}/commands`);
await loader.events(`${process.cwd()}/events`);

client.login(process.env.token);

console.log("asdasd");