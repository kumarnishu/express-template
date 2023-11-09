import express from "express"
import { GetUsers, Home } from "./controller";

const router=express.Router()

router.route("/").get(Home)
router.route("/users").get(GetUsers)

export default router