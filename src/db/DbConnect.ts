import mongoose from 'mongoose';

const ConnectDB = async() : Promise<void> => {
    try{
        await mongoose.connect(String(process.env.MONGO_URL));
        console.log(`Mongo Connected `);
    } catch(error){
        console.error("Error is ",error);
        process.exit(1);
    }
}

export default ConnectDB;