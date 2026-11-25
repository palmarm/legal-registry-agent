import { defineConfig } from "prisma/config";
import { getDatabaseUrl } from "./src/config/database.ts";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: getDatabaseUrl(),
  },
});
