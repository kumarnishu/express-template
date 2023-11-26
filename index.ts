import express from "express"
import ENV from "dotenv"
import Routes from "./routes"
import { connectDatabase } from "./db"
import session from 'express-session'
import MongoStore from 'connect-mongo'


const app = express()

ENV.config()
app.use(express.json())
const PORT = process.env.PORT

app.use(session({
    secret: process.env.SESSION_SECRET || "some secret",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    cookie: { secure: false },
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL || "mongodb://127.0.0.1:27017/test",
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
        touchAfter: 24 * 3600 // 24hr
    })
}));


connectDatabase()

app.use("/api/v1/", Routes)

app.listen(PORT, () => console.log(`server is active on http://localhost:${PORT}`))
