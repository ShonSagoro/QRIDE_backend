import { Express } from "express";
import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { createBusController, deleteBusController, getByUUIDBusController, listBusController, updateBusController } from "../Dependecies";

const Verifytoken = JWTMiddleware.VerifyToken
const MODEL_URL = "/bus";
const BASE_URL = process.env.BASE_URL || "/api/v1";

export function setupBusRoutes(app: Express) {
    app.post(`${BASE_URL}${MODEL_URL}`, Verifytoken, createBusController.execute.bind(createBusController));
    app.put(`${BASE_URL}${MODEL_URL}/:uuid`, Verifytoken, updateBusController.execute.bind(updateBusController));
    app.get(`${BASE_URL}${MODEL_URL}/:uuid`, Verifytoken, getByUUIDBusController.execute.bind(getByUUIDBusController));
    app.delete(`${BASE_URL}${MODEL_URL}/:uuid`, Verifytoken, deleteBusController.execute.bind(deleteBusController));
    app.get(`${BASE_URL}${MODEL_URL}`, Verifytoken, listBusController.execute.bind(listBusController));
}