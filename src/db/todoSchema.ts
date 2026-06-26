import mongoose , {Schema, Document, Model} from 'mongoose';

export interface ITodo extends Document{
    title : string,
    description : string,
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
    },{
        timestamps : true,
    }
);

const Todo : Model<ITodo> = mongoose.model<ITodo>('Todo',todoSchema);

export default Todo;