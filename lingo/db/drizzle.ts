import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
import { config } from "dotenv";
config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, {schema});

export default db;

