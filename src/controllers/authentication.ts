import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../db/userSchema.js";
import generatetoken from "./JWTGenerator.js";

type Routehandler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void>;

export const registerUser: Routehandler = async (req, res, next) => {
    try {
        const { fullname, username, password }: IUser = req.body;

        const userExists: IUser | null = await User.findOne({ username });

        if (userExists) {
            res.status(400).json({
                success: false,
                msg: 'User Already Exists',
            });
        }

        const user: IUser = await User.create({ fullname, username, password });

        res.status(201).json({
            success: true,
            msg: 'User Created Successfully',
        });
    } catch (error: any) {

        next(error);

    }
}

export const loginUser: Routehandler = async (req, res, next) => {

    try {
        const { username, password } = req.body;

        const user: IUser | null = await User.findOne({ username }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generatetoken({ id: user._id.toString() }),
            });
        } else {
            res.status(401).json({
                message: 'Invalid email or password'
            });
        }

    } catch (error: any) {

        next(error);

    }

}