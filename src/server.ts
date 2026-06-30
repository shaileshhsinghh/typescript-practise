import  dotenv from 'dotenv';
import  path from 'path';
import { fileURLToPath } from 'url';
import express , { Application } from 'express';
import ErrorHandler from './middlewares/errorhandler.js';
import routes from './routes/userRoutes.js';
import NotFound from './middlewares/notfound.js';
import ConnectDB from './db/DbConnect.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env')  
});


const app: Application = express();

ConnectDB();

app.use(express.json());


app.use(routes);

app.use(NotFound);

app.use(ErrorHandler);

app.listen(Number(process.env.PORT), () => {
    console.log(`Server Running on port ${process.env.PORT}`);
});