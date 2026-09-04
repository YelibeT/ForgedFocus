import express from "express"
import cors from "cors"
import userRoute from "./route/userRoute.js"
import { signIn } from "./auth/userAuth.js"

const app = express()

const PORT = 8800

app.use(cors())
app.use(express.json())
app.use("/users", userRoute)
app.post("/signin", signIn)

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server responding" })
})


app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
)