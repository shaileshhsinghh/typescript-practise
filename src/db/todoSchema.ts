import mongoose , {Schema, Document, Model, Types} from 'mongoose';
import User from './userSchema.js';

export interface ITodo extends Document{
    title : string,
    description : string,
    createdBy : Types.ObjectId,
    createdAt : Date,
    updatedAt : Date,
}

const todoSchema : Schema<ITodo> = new Schema(
    {
        title : {
            type : String,
            required : [true, 'Title is Required'],
            trim : true,
        },
        description : {
            type : String,
            required : [true, 'Description is Required'],
            trim : true,
        },
        createdBy : {
            type : Types.ObjectId,
            ref : 'User',
        },
    },{
        timestamps : true,
    }
);

const Todo : Model<ITodo> = mongoose.model<ITodo>('Todo',todoSchema);

export default Todo;