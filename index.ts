import express from "express"
import ENV from "dotenv"


const app = express()
ENV.config()

const PORT = process.env.PORT




app.listen(PORT, () => console.log(`server is active on ${PORT}`))