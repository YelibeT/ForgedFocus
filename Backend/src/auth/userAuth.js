import bcrypt from "bcrypt";
import { database } from "../db.js";

export async function createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
        return res.status(400).json({
            message: "Required fields not filled."
        });
    }

    try {
        const existingUser = await database.query(
            "SELECT user_id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "Email already in use"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await database.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING user_id, name, email`,
            [name, email, passwordHash]
        );

        const user = result.rows[0];

        return res.status(201).json({
            userId: user.user_id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not create user"
        });
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const result = await database.query(
            `SELECT user_id, name, email, password
             FROM users
             WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        return res.status(200).json({
            userId: user.user_id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not sign in"
        });
    }
}