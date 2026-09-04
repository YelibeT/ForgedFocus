import express from "express"
import cors from "cors"
import userRoute from "./route/userRoute.js"

const app = express()

const PORT = 8800

app.use(cors())
app.use(express.json())
app.use("/users", userRoute)

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server responding" })
})


app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
)