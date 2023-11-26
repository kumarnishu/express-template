import { NextFunction, Request, Response } from "express"

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session)
        next()
    else return res.status(404).json({ message: "please login to access this resource" })
}

export const sendUserToken = (res: Response, accessToken: string) => {
    const Expiry = Number(process.env.COOKIE_EXPIRE) || 1
    res.cookie("accessToken", accessToken, {
        maxAge: Expiry * 60 * 1000,//1 minute by default
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
}
//logout
export const deleteToken = async (res: Response, accessToken: string) => {
    const options = {
        maxAge: 0,
        httpOnly: true
    };
    res.cookie("accessToken", null, options);
};