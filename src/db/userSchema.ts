import mongoose , {Schema , Document, Model} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document{
    fullname : string,
    username : string,
    password : string,
    createdAt : Date,
    updatedAt : Date,
    matchPassword (enteredPassword : string): Promise<boolean>,
}

const userSchema : Schema<IUser> = new Schema(
    {
        fullname : {
            type : String,
            required : [true, 'User cannot exist without a name'],
            trim : true,
        },
        username : {
            type : String,
            required : [true, 'Should have a username for login'],
            trim : true,
        },
        password : {
            type : String,
            required : [true, 'Password is required'],
            select : false,
            trim : true,
        },
    },{
        timestamps : true,
    }
);

userSchema.pre<IUser>('save', async function (this : IUser) {
    if(!this.isModified('password')) return ;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function(this : IUser, enteredPassword : string) : Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User : Model<IUser> = mongoose.model<IUser>('User',userSchema);

export default User;