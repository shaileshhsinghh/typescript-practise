import { NextFunction, Request, Response, } from "express";
import Todo, { ITodo } from "../db/todoSchema.js";

type RequestHandler = (
    req : Request,
    res : Response,
    next : NextFunction,
) => Promise<void>;

//create
export const createTodo : RequestHandler = async(req , res , next) => {
    try{
        const { title  ,description  }  = req.body;

        const todo = await Todo.create({title, description});

        res.status(201).json({
            success : true,
        })
    } catch(error : any){
        next(error);
    }
};

//readall
export const getTodos : RequestHandler = async(req , res , next) => {
    try{
        const todos = await Todo.find();
         
        res.json(todos);
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
export const deleteTodo : RequestHandler = async(req, res , next) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if(!todo){
            next(new Error('Todo not found'));
            return;
        }

        res.json({
            success : true,
        })
    } catch (error : any) {
        next(error);
    }
}