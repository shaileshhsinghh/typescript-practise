import mongoose from 'mongoose';

const ConnectDB = async() : Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`Mongo Connected `);
    } catch(error){
        console.error("Error is ",error);
        process.exit(1);
    }
}

export default ConnectDB;