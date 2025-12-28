import "dotenv/config";
import { Client, GatewayIntentBits, Partials, type Collection } from "discord.js";

export interface ExtendedClient extends Client {
  slashCommands: Collection<any, any>;
}

const client = new Client({
  intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
  partials: Object.values(Partials) as Partials[]
}) as ExtendedClient;

export default client;

client.login(process.env.token);