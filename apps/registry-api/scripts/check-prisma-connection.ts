import { existsSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { getDatabaseUrl } from "../src/config/database.ts";

const clientPath = new URL("../src/generated/prisma/client.ts", import.meta.url);

if (!existsSync(clientPath)) {
  console.error(
    "Generated Prisma Client is missing. Run prisma:generate in registry-api. " +
      "An empty schema may prevent generation until real models are added.",
  );
  process.exitCode = 1;
} else {
  try {
    const { PrismaClient } = await import(clientPath.href);
    const adapter = new PrismaPg({
      connectionString: getDatabaseUrl(),
      connectionTimeoutMillis: 5000,
      // Enforce read-only sessions for this verification command.
      options: "-c default_transaction_read_only=on",
    });
    const prisma = new PrismaClient({ adapter });

    try {
      const rows = await prisma.$queryRaw`
        SELECT current_database() AS database, current_user AS "user"
      `;
      if (
        rows.length !== 1 ||
        rows[0].database !== "legal_registry_dev" ||
        rows[0].user !== "legal_registry"
      ) {
        throw new Error("Unexpected database or role.");
      }
      console.log("current_database: legal_registry_dev");
      console.log("current_user: legal_registry");
    } finally {
      await prisma.$disconnect();
    }
  } catch {
    // Driver and Prisma errors can contain connection details.
    console.error("Prisma connection check failed; connection details withheld.");
    process.exitCode = 1;
  }
}
