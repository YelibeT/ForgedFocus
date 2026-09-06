import bcrypt from "bcrypt";
import crypto from "crypto";
import { database } from "../db.js";
import { sendVerificationEmail } from "../services/emailService.js";

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

        // Create a random verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Token expires after 1 hour
        const verificationExpires = new Date(
            Date.now() + 60 * 60 * 1000
        );

        const result = await database.query(
            `INSERT INTO users
                (
                    name,
                    email,
                    password,
                    email_verified,
                    verification_token,
                    verification_expires
                )
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING user_id, name, email`,
            [
                name,
                email,
                passwordHash,
                false,
                verificationToken,
                verificationExpires
            ]
        );

        const user = result.rows[0];

        // Send confirmation email
        await sendVerificationEmail(
            email,
            name,
            verificationToken
        );

        return res.status(201).json({
            userId: user.user_id,
            name: user.name,
            email: user.email,
            message: "Account created. Please check your email to verify your account."
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
            `SELECT
                user_id,
                name,
                email,
                password,
                email_verified
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

        // Don't allow login until email is verified
        if (!user.email_verified) {
            return res.status(403).json({
                message: "Please verify your email before signing in."
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