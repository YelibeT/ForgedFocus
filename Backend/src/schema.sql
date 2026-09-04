CREATE TABLE IF NOT EXISTS User (
        user_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
CREATE TABLE IF NOT EXISTS Session (
        session_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        time TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS Task (
        task_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL
    );