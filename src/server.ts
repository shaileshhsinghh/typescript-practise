import express , { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes/userRoutes.js';
import ConnectDB from './db/DbConnect.js';

dotenv.config();

const app : Application = express();

ConnectDB();

app.use(routes);

app.listen(Number(process.env.PORT),()=>{
    console.log('Server Running');
});