import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
}

export const database = new Pool({
    connectionString: process.env.DATABASE_URL
});

await database.query("SELECT 1");

await database.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

await database.query(`
    CREATE TABLE IF NOT EXISTS session (
        session_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        time TEXT NOT NULL
    )
`);

await database.query(`
    CREATE TABLE IF NOT EXISTS task (
        task_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL
    )
`);

console.log("Database connected and tables are ready");