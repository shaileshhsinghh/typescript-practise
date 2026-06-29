import { NextFunction, Request, Response, } from "express";
import Todo, { ITodo } from "../db/todoSchema.js";
import User from "../db/userSchema.js";
import { Authrequest } from "../middlewares/authorisation.js";

type RequestHandler = (
    req : Authrequest,
    res : Response,
    next : NextFunction,
) => Promise<void>;

//create
export const createTodo: RequestHandler = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;  

        const todo : ITodo = await Todo.create({ title, description, createdBy: userId });

        await User.findByIdAndUpdate(userId, {
            $push: { todos: todo._id }
        });

        res.status(201).json({
            success: true,
        });
    } catch (error: any) {
        next(error);
    }
};

//readall
export const getTodos : RequestHandler = async(req , res , next) => {
    try{

        const userId = req.user.id; 

        const user = await User.findById(userId).populate('todos');
         
        res.status(200).json({
            success : true,
            todos : user ?.todos || [],
        });

    } catch(error : any){
        next(error);
    }
};

//update
export const updateTodo : RequestHandler = async(req , res , next) => {
    try{
        const {title , description} = req.body;

        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {title, description},
            {new : true, runValidators : true}
        );

        if(!todo){
            next(new Error("Todo was not found"));
            return;
        }

        res.status(200).json({
            success : true,
        });
    } catch(error : any){
        next(error);
    }
};

//delete
export const deleteTodo: RequestHandler = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            next(new Error('Todo not found'));
            return;
        }

        
        await User.findByIdAndUpdate(userId, {
            $pull: { todos: todo._id }
        });

        res.json({
            success: true,
        });
        
    } catch (error: any) {
        next(error);
    }
};