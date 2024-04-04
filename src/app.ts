import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { setupUserRoutes } from './user_management/infraestructure/routes/UserRoutes';
import { setupUserHistoryRoutes } from './user_management/infraestructure/routes/UserHistoryRoutes';
import { setupBusRoutes } from './bus_management/infraestructure/routes/BusRoutes';
import { setupRoutesBusRoutes } from './bus_management/infraestructure/routes/RoutesBusRoutes';
import { setupValorationRoutes } from './bus_management/infraestructure/routes/ValorationRoutes';
dotenv.config();

const app = express();


const HOST:string = process.env.HOST_SERVER || 'localhost';
const PORT:number  = Number(process.env.PORT_SERVER) || 8080;
const BASE_URL = process.env.BASE_URL || "/api/v1/";

app.use(express.static(path.join(__dirname, './public/images')));
app.use(express.json()); 
setupUserRoutes(app);
setupUserHistoryRoutes(app);
setupBusRoutes(app);
setupRoutesBusRoutes(app);
setupValorationRoutes(app);
app.use(morgan('dev'))

app.listen(PORT, HOST, () => {
    console.log(`Server is running on host ${HOST} and port ${PORT}`);
});

export { app };