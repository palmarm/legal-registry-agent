import { readFileSync } from "node:fs";
import { parseEnv } from "node:util";

// Resolve from this module so CLI and runtime checks share the root .env,
// regardless of the current working directory. Never log these settings.
export function getDatabaseUrl(): string {
  let settings: ReturnType<typeof parseEnv>;
  try {
    settings = parseEnv(
      readFileSync(new URL("../../../../.env", import.meta.url), "utf8"),
    );
  } catch {
    throw new Error("Cannot read the repository root .env.");
  }

  const required = (name: string): string => {
    const value = settings[name];
    if (!value) {
      throw new Error(`Missing required setting ${name} in the root .env.`);
    }
    return value;
  };

  const database = required("POSTGRES_DB");
  const user = required("POSTGRES_USER");
  const password = required("POSTGRES_PASSWORD");
  const port = Number(required("POSTGRES_PORT"));
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("POSTGRES_PORT must be a valid TCP port.");
  }

  const url = new URL("postgresql://127.0.0.1");
  url.port = String(port);
  url.username = encodeURIComponent(user);
  url.password = encodeURIComponent(password);
  url.pathname = `/${encodeURIComponent(database)}`;
  return url.href;
}
