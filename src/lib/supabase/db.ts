import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "../../../migrations/schema";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("Não foi possível encontrar a variável DATABASE_URL");
}

const client = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});
const db = drizzle(client, { schema });

const migrateDb = async () => {
  try {
    console.log("🟡 Migration Client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟢 Migration Client Done");
  } catch {
    console.log("🔴 Error Migration Client");
  }
};

migrateDb();
export default db;
