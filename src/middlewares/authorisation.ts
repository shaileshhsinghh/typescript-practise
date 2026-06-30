import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/userSchema.js';


export interface Authrequest extends Request {
    user?: any;
}

interface JwtPayload {
    id: string;
}

type Routehandler = (
    req: Authrequest,
    res: Response,
    next: NextFunction,
) => Promise<void>;

export const protect: Routehandler = async (req, res, next) => {
    let token: string | undefined;

    if (req.header('authorization') && req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Not auhtorised , no token",
        })
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'User not found',
            })
            return;
        }

        req.user = user._id.toString();

        next();
    } catch (error: any) {
        next(error);
    }
}