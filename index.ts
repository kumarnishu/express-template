import express from "express"
import ENV from "dotenv"
import Routes from "./routes"
import { connectDatabase } from "./db"

const app = express()
ENV.config()

const PORT = process.env.PORT

connectDatabase()

app.use("/api/v1", Routes)

app.listen(PORT, () => console.log(`server is active on http://localhost:${PORT}`))
