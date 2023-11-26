import { NextFunction, Request, Response } from "express";
import { User } from "./User";
import { sendUserToken } from "./auth.middleware";

export const Home = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ status: "success", time: new Date().toString(), session: req.session })
}

export const Signup = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body as { username: string, password: string }

    if (await User.findOne({ username }))
        return res.status(403).json({ message: "a user already exists with this name" })

    const user = new User({
        username, password
    })
    await user.save()
    return res.status(200).json(user)
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body as { username: string, password: string }
    let user = await User.findOne({ username })
    if (!user || !user.comparePassword(password))
        return res.status(403).json({ message: "Wrong username or password" })
    else {
        req.session.save()
        sendUserToken(res, req.session.id)
        return res.status(200).json(user)
    }
}