import express from "express"
import { createUser } from "../auth/userAuth.js"

const userRoute = express.Router()

userRoute.post("/", createUser)

export default userRoute
