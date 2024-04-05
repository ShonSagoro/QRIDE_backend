import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { Express } from "express";
import { createStopBusController, deleteStopBusController, getByAproximationStopBusController, getByRouteUUIDStopBusController, getByUUIDStopBusController, updateStopBusController } from "../Dependecies";

const Verifytoken = JWTMiddleware.VerifyToken
const MODEL_URL = "stops/";
const BASE_URL = process.env.BASE_URL || "/api/v1/";

export function setupStopsRoutes(app: Express) {
    app.get(`${BASE_URL}${MODEL_URL}health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`${BASE_URL}${MODEL_URL}`, Verifytoken, createStopBusController.execute.bind(createStopBusController));
    app.delete(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, deleteStopBusController.execute.bind(deleteStopBusController));
    app.post(`${BASE_URL}${MODEL_URL}aprox`, Verifytoken, getByAproximationStopBusController.execute.bind(getByAproximationStopBusController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, getByUUIDStopBusController.execute.bind(getByUUIDStopBusController));
    app.get(`${BASE_URL}${MODEL_URL}routes/:uuid`, Verifytoken, getByRouteUUIDStopBusController.execute.bind(getByRouteUUIDStopBusController));
    app.put(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, updateStopBusController.execute.bind(updateStopBusController));
}