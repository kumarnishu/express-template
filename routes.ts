import express from "express"
import { Signup, Home, Login } from "./controller";
import { isAuthenticated } from "./auth.middleware";

const router = express.Router()

router.route("/").get(isAuthenticated,Home)
router.route("/users").post(Signup)
router.route("/login").post(Login)

export default router