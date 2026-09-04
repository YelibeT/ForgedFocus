import bcrypt from "bcrypt"
import { database } from "../db.js"

export async function createUser(req, res) {
    const { name, email, password } = req.body
    if (!name || !password || !email) {
        return res.status(400).json({
            message: "Required fields not filled."
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    try {
        const result = database
            .prepare("INSERT INTO User (Name, Email, Password) VALUES (?, ?, ?)")
            .run(name, email, passwordHash)

        return res.status(201).json({
            userId: Number(result.lastInsertRowid),
            name,
            email
        })
    } catch (error) {
        if (error.errcode === 2067) {
            return res.status(409).json({ message: "Email already in use" })
        }

        console.error(error)
        return res.status(500).json({ message: "Could not create user" })
    }
}
