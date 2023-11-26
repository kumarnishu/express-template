// import session from 'express-session';
import { IUser } from "./types"

declare global {
    namespace Express {
        export interface Request {
            user: IUser | null
        }
    }
}

// declare module 'express-session' {
//     export interface SessionData {
//         user: IUser | null
//     }
// }