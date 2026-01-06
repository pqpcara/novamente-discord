import type { ClientEvents } from "discord.js";

type EventRun<Name extends keyof ClientEvents> = (
  client: import("..").ExtendedClient,
  ...args: ClientEvents[Name]
) => ClientEvents[Name] extends void ? void | Promise<void> : (...args: ClientEvents[Name]) => void | Promise<void>;

export function createEvent<Name extends keyof ClientEvents>(options: {
  name: Name;
  once?: boolean;
  run: EventRun<Name>;
}) {
  return options;
}