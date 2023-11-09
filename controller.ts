import { NextFunction, Request, Response } from "express";

export const Home = async (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({ status: "success" })
}
export const GetUsers = async (req: Request, res: Response, next: NextFunction) => {
    let users = [
        { username: "nishu kumar" },
        { username: "rahul kumar" }
    ]
    return res.status(200).json(users)
}