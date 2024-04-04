import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { Express } from "express";
import { createRoutesBusController, deleteRoutesBusController, getByUUIDRoutesBusController, listRoutesBusController, updateRoutesBusController } from "../Dependecies";

const Verifytoken = JWTMiddleware.VerifyToken
const MODEL_URL = "/routes";
const BASE_URL = process.env.BASE_URL || "/api/v1";

export function setupRoutesBusRoutes(app: Express) {
    app.post(`${BASE_URL}${MODEL_URL}`, Verifytoken, createRoutesBusController.execute.bind(createRoutesBusController));
    app.put(`${BASE_URL}${MODEL_URL}/:uuid`, Verifytoken, updateRoutesBusController.execute.bind(updateRoutesBusController));
    app.delete(`${BASE_URL}${MODEL_URL}/:uuid`, Verifytoken, deleteRoutesBusController.execute.bind(deleteRoutesBusController));
    app.get(`${BASE_URL}${MODEL_URL}`, Verifytoken, listRoutesBusController.execute.bind(listRoutesBusController));
    app.get(`${BASE_URL}${MODEL_URL}/:uuid`, Verifytoken, getByUUIDRoutesBusController.execute.bind(getByUUIDRoutesBusController));
}