// creates the connection between your Node/Express backend and your PostgreSQL database.

import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

export const database = new Pool({
    connectionString: process.env.DATABASE_URL
});

await database.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    ),
    CREATE TABLE IF NOT EXISTS Session (
        session_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        time TEXT NOT NULL
),
    CREATE TABLE IF NOT EXISTS Task (
        task_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL
    )
`);