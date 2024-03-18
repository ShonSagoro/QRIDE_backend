import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { setupUserRoutes } from './src/user_management/infraestructure/routes/UserRoutes';
dotenv.config();

const app = express();


const HOST:string = process.env.HOST_SERVER || 'localhost';
const PORT:number  = Number(process.env.PORT_SERVER) || 8080;
const BASE_URL = process.env.BASE_URL || "/api/v1/";

app.use(express.static(path.join(__dirname, './public/images')));
app.use(express.json()); 
setupUserRoutes(app);
app.use(morgan('dev'))

app.listen(PORT, HOST, () => {
    console.log(`Server is running on host ${HOST} and port ${PORT}`);
});