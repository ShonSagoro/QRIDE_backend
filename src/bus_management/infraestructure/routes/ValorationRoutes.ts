import { Express } from "express";
import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { createValorationController, deleteValorationController, getByUUIDBusValorationController, getByUUIDUserValorationController, getByUUIDValorationController, listValorationController, updateValorationController } from "../Dependecies";

const Verifytoken = JWTMiddleware.VerifyToken
const MODEL_URL = "valorations/";
const BASE_URL = process.env.BASE_URL || "/api/v1/";

export function setupValorationRoutes(app: Express) {
    app.get(`${BASE_URL}${MODEL_URL}health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`${BASE_URL}${MODEL_URL}`, Verifytoken, createValorationController.execute.bind(createValorationController));
    app.delete(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, deleteValorationController.execute.bind(deleteValorationController));
    app.get(`${BASE_URL}${MODEL_URL}bus/:uuid`, Verifytoken, getByUUIDBusValorationController.execute.bind(getByUUIDBusValorationController));
    app.get(`${BASE_URL}${MODEL_URL}user/:uuid`, Verifytoken, getByUUIDUserValorationController.execute.bind(getByUUIDUserValorationController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, getByUUIDValorationController.execute.bind(getByUUIDValorationController));
    app.get(`${BASE_URL}${MODEL_URL}`, Verifytoken, listValorationController.execute.bind(listValorationController));
    app.put(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, updateValorationController.execute.bind(updateValorationController));
}