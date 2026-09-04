import { DatabaseSync } from "node:sqlite"

export const database = new DatabaseSync("forgedfocus.db")

database.exec(`
    CREATE TABLE IF NOT EXISTS User (
        user_id INTEGER PRIMARY KEY,
        Name TEXT NOT NULL,
        Email TEXT UNIQUE NOT NULL,
        Password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS Session (
        session_id INTEGER PRIMARY KEY,
        Title TEXT NOT NULL,
        Time TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS Task (
        task_id INTEGER PRIMARY KEY,
        Title TEXT NOT NULL,
        Category TEXT NOT NULL
    );
`)

